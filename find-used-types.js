#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths to the three projects
const PROJECTS = {
  'event': '/Users/behnam/.cursor/worktrees/tiktok-integration/4eWtC/event',
  'service': '/Users/behnam/.cursor/worktrees/tiktok-integration/4eWtC/service',
  'refresh-token-job': '/Users/behnam/.cursor/worktrees/tiktok-integration/4eWtC/refresh-token-job'
};

// Application code directories (not type definitions)
const APP_CODE_DIRS = [
  'src/controllers',
  'src/connector',
  'src/utils',
  'src/middleware',
  'src/routes',
  'src/api',
  'src/errors',
  'src/shared/services',
  'src/shared/mappers',
  'src/shared/router-service',
  'src/shared/utils',
  'src/shared/commercetools',
  'src/shared/commercetools-storage'
];

// Function to extract all type names from models.ts
function extractAllTypeNames(modelsPath) {
  const content = fs.readFileSync(modelsPath, 'utf-8');
  const typeNames = [];
  const exportPattern = /export \* from ['"](.+\/([^'"\/]+))['"]/g;
  let match;
  
  while ((match = exportPattern.exec(content)) !== null) {
    typeNames.push(match[2]);
  }
  
  return typeNames;
}

// Function to check if a type is used in application code
function isTypeUsedInProject(projectPath, typeName) {
  const searchPattern = `TiktokSDK\\.${typeName}`;
  
  // Search in application code directories
  for (const dir of APP_CODE_DIRS) {
    const fullPath = path.join(projectPath, dir);
    if (!fs.existsSync(fullPath)) continue;
    
    try {
      const command = `grep -r "${searchPattern}" "${fullPath}" --include="*.ts" --include="*.tsx" 2>/dev/null || true`;
      const result = execSync(command, { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
      
      const lines = result.split('\n').filter(line => line.trim());
      
      if (lines.length > 0) {
        return true;
      }
    } catch (error) {
      // Ignore errors and continue
    }
  }
  
  return false;
}

// Find all directly used types across all projects
function findGloballyUsedTypes() {
  console.log('🔍 TikTok SDK Type Usage Analysis\n');
  console.log('=' .repeat(80));
  
  // Collect all type names from all projects
  console.log('\n📚 Step 1: Collecting type definitions...');
  const typesByProject = {};
  const allTypes = new Set();
  
  for (const [projectName, projectPath] of Object.entries(PROJECTS)) {
    const modelsPath = path.join(projectPath, 'src/shared/interfaces/tiktok/models.ts');
    if (fs.existsSync(modelsPath)) {
      const types = extractAllTypeNames(modelsPath);
      typesByProject[projectName] = types;
      types.forEach(t => allTypes.add(t));
      console.log(`   ${projectName}: ${types.length} types`);
    }
  }
  
  const allTypesArray = Array.from(allTypes).sort();
  console.log(`   Total unique types: ${allTypesArray.length}`);
  
  // Find types used in application code
  console.log(`\n📝 Step 2: Searching for type usage in application code...`);
  console.log('   This may take a few minutes...');
  
  const usedTypes = new Set();
  let processed = 0;
  
  for (const typeName of allTypesArray) {
    processed++;
    
    // Check across all projects
    let found = false;
    for (const [projectName, projectPath] of Object.entries(PROJECTS)) {
      if (isTypeUsedInProject(projectPath, typeName)) {
        usedTypes.add(typeName);
        found = true;
        break;
      }
    }
    
    // Progress indicator
    if (processed % 50 === 0 || found) {
      process.stdout.write(`\r   Progress: ${processed}/${allTypesArray.length} types checked, ${usedTypes.size} used types found...`);
    }
  }
  
  console.log(`\r   ✓ Complete: ${processed}/${allTypesArray.length} types checked, ${usedTypes.size} directly used types found!   `);
  
  return {
    allTypes: allTypesArray,
    usedTypes: Array.from(usedTypes).sort(),
    typesByProject
  };
}

// Get type file path
function getTypeFilePath(projectPath, typeName) {
  const modelsPath = path.join(projectPath, 'src/shared/interfaces/tiktok/models.ts');
  const modelsContent = fs.readFileSync(modelsPath, 'utf-8');
  
  const exportPattern = new RegExp(`export \\* from ['"](.+/${typeName})['"]; *$`, 'm');
  const match = modelsContent.match(exportPattern);
  
  if (match) {
    const relativePath = match[1];
    return path.join(projectPath, 'src/shared/interfaces/tiktok', relativePath + '.ts');
  }
  
  return null;
}

// Extract dependencies from a type file
function extractTypeDependencies(typeFilePath, allTypeNames) {
  if (!fs.existsSync(typeFilePath)) {
    return [];
  }
  
  const content = fs.readFileSync(typeFilePath, 'utf-8');
  const dependencies = new Set();
  
  // Find all type references in the file
  for (const typeName of allTypeNames) {
    // Look for type references: : TypeName, <TypeName>, | TypeName, & TypeName, etc.
    const patterns = [
      new RegExp(`[:<,\\s|&(\\[]\\s*${typeName}\\s*[\\s,;>\\]\\)|\\[&]`, 'g'),
      new RegExp(`Array<${typeName}`, 'g')
    ];
    
    for (const pattern of patterns) {
      if (pattern.test(content)) {
        dependencies.add(typeName);
        break;
      }
    }
  }
  
  return Array.from(dependencies);
}

// Build dependency tree and find all transitively used types
function findAllTransitivelyUsedTypes(projectPath, projectName, directlyUsedTypes, allProjectTypes) {
  console.log(`\n📊 Step 3: Analyzing ${projectName}...`);
  console.log('-'.repeat(80));
  
  console.log(`   Building dependency graph...`);
  
  // Build dependency map
  const dependencies = {};
  for (const typeName of allProjectTypes) {
    const typeFilePath = getTypeFilePath(projectPath, typeName);
    if (typeFilePath) {
      dependencies[typeName] = extractTypeDependencies(typeFilePath, allProjectTypes);
    }
  }
  
  // Find all transitively used types using BFS
  console.log(`   Finding all dependencies...`);
  const transitivelyUsed = new Set();
  const toProcess = [];
  
  // Start with directly used types that exist in this project
  for (const typeName of directlyUsedTypes) {
    if (allProjectTypes.includes(typeName)) {
      transitivelyUsed.add(typeName);
      toProcess.push(typeName);
    }
  }
  
  while (toProcess.length > 0) {
    const current = toProcess.shift();
    const deps = dependencies[current] || [];
    
    for (const dep of deps) {
      if (!transitivelyUsed.has(dep) && allProjectTypes.includes(dep)) {
        transitivelyUsed.add(dep);
        toProcess.push(dep);
      }
    }
  }
  
  const unusedTypes = allProjectTypes.filter(t => !transitivelyUsed.has(t));
  
  console.log(`   Total types: ${allProjectTypes.length}`);
  console.log(`   Used types: ${transitivelyUsed.size} (${((transitivelyUsed.size / allProjectTypes.length) * 100).toFixed(1)}%)`);
  console.log(`   ✓ Unused types: ${unusedTypes.length} (${((unusedTypes.length / allProjectTypes.length) * 100).toFixed(1)}%)`);
  
  return {
    projectName,
    totalTypes: allProjectTypes.length,
    usedTypes: Array.from(transitivelyUsed).sort(),
    unusedTypes: unusedTypes.sort()
  };
}

// Generate report
function generateReport(globalData, projectResults) {
  console.log('\n\n');
  console.log('=' .repeat(80));
  console.log('📊 FINAL REPORT');
  console.log('=' .repeat(80));
  
  console.log(`\n\n🌐 Global Summary`);
  console.log('-'.repeat(80));
  console.log(`Total unique types across all projects: ${globalData.allTypes.length}`);
  console.log(`Types directly used in application code: ${globalData.usedTypes.length}`);
  console.log(`Directly unused rate: ${((1 - globalData.usedTypes.length / globalData.allTypes.length) * 100).toFixed(1)}%`);
  
  console.log(`\n📋 Directly used types (${globalData.usedTypes.length} types):`);
  if (globalData.usedTypes.length <= 50) {
    globalData.usedTypes.forEach((type, idx) => {
      console.log(`   ${idx + 1}. ${type}`);
    });
  } else {
    globalData.usedTypes.slice(0, 50).forEach((type, idx) => {
      console.log(`   ${idx + 1}. ${type}`);
    });
    console.log(`   ... and ${globalData.usedTypes.length - 50} more`);
  }
  
  // Save globally used types
  const globalUsedFile = `/Users/behnam/.cursor/worktrees/tiktok-integration/4eWtC/directly-used-types.txt`;
  fs.writeFileSync(globalUsedFile, globalData.usedTypes.join('\n'));
  console.log(`\n   📄 Full list: directly-used-types.txt`);
  
  // Report for each project
  for (const result of projectResults) {
    console.log(`\n\n🏗️  Project: ${result.projectName}`);
    console.log('-'.repeat(80));
    console.log(`Total types: ${result.totalTypes}`);
    console.log(`Used (including dependencies): ${result.usedTypes.length} (${((result.usedTypes.length / result.totalTypes) * 100).toFixed(1)}%)`);
    console.log(`✅ Safe to delete: ${result.unusedTypes.length} (${((result.unusedTypes.length / result.totalTypes) * 100).toFixed(1)}%)`);
    
    // Save files
    const unusedFile = `/Users/behnam/.cursor/worktrees/tiktok-integration/4eWtC/DELETE-${result.projectName}.txt`;
    fs.writeFileSync(unusedFile, result.unusedTypes.join('\n'));
    console.log(`\n   🗑️  Types to delete: DELETE-${result.projectName}.txt`);
    
    const usedFile = `/Users/behnam/.cursor/worktrees/tiktok-integration/4eWtC/KEEP-${result.projectName}.txt`;
    fs.writeFileSync(usedFile, result.usedTypes.join('\n'));
    console.log(`   ✅ Types to keep: KEEP-${result.projectName}.txt`);
  }
  
  // Save comprehensive JSON
  const jsonFile = '/Users/behnam/.cursor/worktrees/tiktok-integration/4eWtC/type-analysis-complete.json';
  fs.writeFileSync(jsonFile, JSON.stringify({ globalData, projectResults }, null, 2));
  console.log(`\n\n💾 Complete JSON report: type-analysis-complete.json`);
  
  console.log(`\n\n${'='.repeat(80)}`);
  console.log('✨ Analysis complete! You can now safely delete the unused types.');
  console.log(`${'='.repeat(80)}\n`);
}

// Main execution
console.log('Starting comprehensive type usage analysis...\n');

const globalData = findGloballyUsedTypes();

const projectResults = [];
for (const [projectName, projectPath] of Object.entries(PROJECTS)) {
  const result = findAllTransitivelyUsedTypes(
    projectPath,
    projectName,
    globalData.usedTypes,
    globalData.typesByProject[projectName]
  );
  projectResults.push(result);
}

generateReport(globalData, projectResults);

