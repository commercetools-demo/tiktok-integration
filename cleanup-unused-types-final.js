#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the list of types to delete
const typesToDelete = new Set(
  fs.readFileSync('types-to-delete-globally.txt', 'utf-8')
    .split('\n')
    .filter(line => line.trim())
    .map(line => line.trim())
);

console.log(`Found ${typesToDelete.size} types to delete globally`);

// Services to clean
const services = ['event', 'refresh-token-job', 'service'];

// Helper function to extract type name from a path
function extractTypeName(exportPath) {
  return exportPath.split('/').pop();
}

// Helper function to extract base type name from prefixed type
// e.g., Product202309ActivateProductRequestBody -> ActivateProductRequestBody
function extractBaseTypeName(fullTypeName) {
  // Remove the prefix pattern: Category+Version (e.g., Product202309, Order202406)
  return fullTypeName.replace(/^[A-Za-z]+\d+/, '');
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
  let deletedObjectExports = 0;
  
  // Process each line
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let shouldSkip = false;
    
    // Check if this is an "export * from" line
    const exportMatch = line.match(/export \* from '(.+?)';/);
    if (exportMatch) {
      const exportPath = exportMatch[1];
      const typeName = extractTypeName(exportPath);
      
      if (typesToDelete.has(typeName)) {
        const filePath = path.join(tiktokInterfacesPath, exportPath + '.ts');
        filesToDelete.add(filePath);
        deletedExports++;
        shouldSkip = true;
      }
    }
    
    // Check if this is an "import {" line
    const importMatch = line.match(/^import \{ (.+?) \} from '(.+?)';/);
    if (importMatch) {
      const importedType = importMatch[1];
      const importPath = importMatch[2];
      const typeName = extractTypeName(importPath);
      
      if (typesToDelete.has(typeName)) {
        deletedImports++;
        shouldSkip = true;
      }
    }
    
    // Check for lines in the export object like: "TypeName": TypeName,
    const objExportMatch = line.match(/^\s*"(.+?)":\s*\1,?\s*$/);
    if (objExportMatch) {
      const fullTypeName = objExportMatch[1];
      const baseTypeName = extractBaseTypeName(fullTypeName);
      
      if (typesToDelete.has(baseTypeName)) {
        deletedObjectExports++;
        shouldSkip = true;
      }
    }
    
    if (!shouldSkip) {
      linesToKeep.push(line);
    }
  }
  
  // Write back the cleaned models.ts
  fs.writeFileSync(modelsPath, linesToKeep.join('\n'));
  console.log(`  ✅ Updated models.ts:`);
  console.log(`     - Removed ${deletedExports} export statements`);
  console.log(`     - Removed ${deletedImports} import statements`);
  console.log(`     - Removed ${deletedObjectExports} object export entries`);
  
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
    
    try {
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
    } catch (err) {
      // Directory might have been deleted already
    }
  }
}

console.log('\n✅ Cleanup complete!');
console.log('\n📊 Summary:');
console.log(`   Total types marked for deletion: ${typesToDelete.size}`);
console.log('\n🔍 Verification steps:');
console.log('1. Check TypeScript compilation: cd <service> && yarn tsc --noEmit');
console.log('2. Run tests if available');
console.log('3. Check git diff to review changes');
console.log('4. Commit the changes if everything looks good');

