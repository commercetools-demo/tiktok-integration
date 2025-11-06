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
  
  // Process each line
  lines.forEach(line => {
    // Check if this is an export line
    const exportMatch = line.match(/export \* from '(.+?)';/);
    
    if (exportMatch) {
      const exportPath = exportMatch[1];
      // Extract the type name from the path (last segment)
      const typeName = exportPath.split('/').pop();
      
      // Check if this type should be deleted
      if (typesToDelete.includes(typeName)) {
        // Mark the file for deletion
        const filePath = path.join(tiktokInterfacesPath, exportPath + '.ts');
        filesToDelete.add(filePath);
        deletedExports++;
        console.log(`  📝 Will remove export: ${typeName}`);
      } else {
        linesToKeep.push(line);
      }
    } else {
      linesToKeep.push(line);
    }
  });
  
  // Write back the cleaned models.ts
  fs.writeFileSync(modelsPath, linesToKeep.join('\n'));
  console.log(`  ✅ Updated models.ts - removed ${deletedExports} exports`);
  
  // Delete the actual type files
  let deletedFiles = 0;
  filesToDelete.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      deletedFiles++;
      console.log(`  🗑️  Deleted: ${path.relative(process.cwd(), filePath)}`);
    }
  });
  
  console.log(`  ✅ Deleted ${deletedFiles} type definition files`);
});

console.log('\n✅ Cleanup complete!');

