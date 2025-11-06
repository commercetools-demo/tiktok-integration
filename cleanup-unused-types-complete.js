#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the list of types to delete
const typesToDelete = fs.readFileSync('types-to-delete-globally.txt', 'utf-8')
  .split('\n')
  .filter(line => line.trim())
  .map(line => line.trim());

console.log(`Found ${typesToDelete.length} types to delete globally`);

// Services to clean
const services = ['event', 'refresh-token-job', 'service'];

// Helper function to extract type name from a path
function extractTypeName(exportPath) {
  return exportPath.split('/').pop();
}

// Helper function to check if a type should be deleted
function shouldDelete(typeName) {
  return typesToDelete.includes(typeName);
}

// Process each service
services.forEach(service => {
  console.log(`\n=== Processing ${service} ===`);
  
  const modelsPath = path.join(service, 'src', 'shared', 'interfaces', 'tiktok', 'models.ts');
  const tiktokInterfacesPath = path.join(service, 'src', 'shared', 'interfaces', 'tiktok');
  
  if (!fs.existsSync(modelsPath)) {
    console.log(`  ⚠️  models.ts not found at ${modelsPath}`);
    return;
  }
  
  // Read models.ts
  const modelsContent = fs.readFileSync(modelsPath, 'utf-8');
  const lines = modelsContent.split('\n');
  
  const filesToDelete = new Set();
  const linesToKeep = [];
  let deletedExports = 0;
  let deletedImports = 0;
  let inObjectExport = false;
  
  // Process each line
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this is an "export * from" line
    const exportMatch = line.match(/export \* from '(.+?)';/);
    if (exportMatch) {
      const exportPath = exportMatch[1];
      const typeName = extractTypeName(exportPath);
      
      if (shouldDelete(typeName)) {
        const filePath = path.join(tiktokInterfacesPath, exportPath + '.ts');
        filesToDelete.add(filePath);
        deletedExports++;
        continue; // Skip this line
      }
    }
    
    // Check if this is an "import {" line
    const importMatch = line.match(/^import \{ (.+?) \} from '(.+?)';/);
    if (importMatch) {
      const importedType = importMatch[1];
      const importPath = importMatch[2];
      const typeName = extractTypeName(importPath);
      
      if (shouldDelete(typeName)) {
        deletedImports++;
        continue; // Skip this line
      }
    }
    
    // Check if we're in the export object section
    if (line.trim().startsWith('export const Types = {') || line.trim().startsWith('let primitiveTypes = [')) {
      inObjectExport = true;
    }
    
    // If in object export section, check for type references
    if (inObjectExport) {
      // Check for lines like: "TypeName": TypeName,
      const objExportMatch = line.match(/^\s*"(.+?)":\s*\1,?\s*$/);
      if (objExportMatch) {
        const typeName = objExportMatch[1];
        // Extract the base type name without the prefix (e.g., Product202309ActivateProductRequestBody -> ActivateProductRequestBody)
        const baseTypeName = typeName.replace(/^[A-Za-z]+\d+/, '');
        
        if (shouldDelete(baseTypeName)) {
          continue; // Skip this line
        }
      }
    }
    
    linesToKeep.push(line);
  }
  
  // Write back the cleaned models.ts
  fs.writeFileSync(modelsPath, linesToKeep.join('\n'));
  console.log(`  ✅ Updated models.ts:`);
  console.log(`     - Removed ${deletedExports} export statements`);
  console.log(`     - Removed ${deletedImports} import statements`);
  
  // Delete the actual type files
  let deletedFiles = 0;
  let notFoundFiles = 0;
  filesToDelete.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      deletedFiles++;
    } else {
      notFoundFiles++;
    }
  });
  
  console.log(`  🗑️  Deleted ${deletedFiles} type definition files`);
  if (notFoundFiles > 0) {
    console.log(`  ⚠️  ${notFoundFiles} files were not found (may have been already deleted)`);
  }
  
  // Clean up empty directories
  console.log(`  🧹 Cleaning up empty directories...`);
  cleanupEmptyDirs(tiktokInterfacesPath);
});

// Helper function to recursively clean up empty directories
function cleanupEmptyDirs(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      cleanupEmptyDirs(fullPath);
      
      // Check if directory is now empty
      const remainingFiles = fs.readdirSync(fullPath);
      if (remainingFiles.length === 0) {
        fs.rmdirSync(fullPath);
        console.log(`     Removed empty directory: ${path.relative(process.cwd(), fullPath)}`);
      }
    }
  }
}

console.log('\n✅ Cleanup complete!');
console.log('\nNext steps:');
console.log('1. Test the applications to ensure everything still works');
console.log('2. Check for any TypeScript compilation errors');
console.log('3. Commit the changes if everything looks good');

