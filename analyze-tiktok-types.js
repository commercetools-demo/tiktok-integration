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

// Function to get the path of a type file
function getTypeFilePath(projectPath, typeName, modelsContent) {
  const exportPattern = new RegExp(`export \\* from ['"](.+/${typeName})['"]; *$`, 'm');
  const match = modelsContent.match(exportPattern);
  
  if (match) {
    const relativePath = match[1];
    const fullPath = path.join(projectPath, 'src/shared/interfaces/tiktok', relativePath + '.ts');
    return fullPath;
  }
  
  return null;
}

// Function to extract type dependencies from a type file
function extractTypeDependencies(typeFilePath, allTypeNames) {
  if (!fs.existsSync(typeFilePath)) {
    return [];
  }
  
  const content = fs.readFileSync(typeFilePath, 'utf-8');
  const dependencies = new Set();
  
  // Match imports from the same tiktok types directory
  const importPattern = /import.*?\{\s*([^}]+)\s*\}.*?from\s+['"][^'"]+['"]/g;
  let match;
  
  while ((match = importPattern.exec(content)) !== null) {
    const imports = match[1].split(',').map(i => i.trim());
    imports.forEach(imp => {
      const typeName = imp.replace(/^type\s+/, '').trim();
      if (allTypeNames.includes(typeName)) {
        dependencies.add(typeName);
      }
    });
  }
  
  // Also match type references in the file content
  allTypeNames.forEach(typeName => {
    // Look for the type name used as a type annotation (: TypeName or <TypeName>)
    const typeRefPattern = new RegExp(`[:<,\\s]${typeName}([\\s,;>\\]\\)|]|$)`, 'g');
    if (typeRefPattern.test(content)) {
      dependencies.add(typeName);
    }
  });
  
  return Array.from(dependencies);
}

// Function to find directly used types (used in application code via Types.TiktokSDK.TypeName)
function findDirectlyUsedTypes(allProjects, allTypes) {
  console.log(`\n🔎 Searching for direct type usages across all projects...`);
  const directlyUsed = new Set();
  
  // Search across ALL projects for any usage
  for (const typeName of allTypes) {
    try {
      // Search for Types.TiktokSDK.TypeName pattern
      const searchPattern = `TiktokSDK\\.${typeName}`;
      
      for (const [projectName, projectPath] of Object.entries(allProjects)) {
        const command = `grep -r "${searchPattern}" "${projectPath}/src" --include="*.ts" --include="*.tsx" --exclude-dir="interfaces" 2>/dev/null || true`;
        const result = execSync(command, { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
        
        const lines = result.split('\n').filter(line => {
          return line.trim() && 
                 !line.includes('models.ts') && 
                 !line.includes('/interfaces/') &&
                 !line.includes(`export type * as TiktokSDK`);
        });
        
        if (lines.length > 0) {
          directlyUsed.add(typeName);
          break; // Found usage, no need to check other projects
        }
      }
    } catch (error) {
      // Ignore errors
    }
    
    // Progress indicator
    if (directlyUsed.size % 10 === 0 && directlyUsed.size > 0) {
      process.stdout.write(`\r   Found ${directlyUsed.size} directly used types...`);
    }
  }
  
  console.log(`\r   ✓ Found ${directlyUsed.size} directly used types            `);
  return directlyUsed;
}

// Function to build complete dependency graph and find all transitively used types
function analyzeProject(projectPath, projectName, globallyUsedTypes) {
  console.log(`\n📊 Analyzing ${projectName}...`);
  console.log('-'.repeat(80));
  
  const modelsPath = path.join(projectPath, 'src/shared/interfaces/tiktok/models.ts');
  
  if (!fs.existsSync(modelsPath)) {
    console.log(`   ⚠️  models.ts not found`);
    return null;
  }
  
  const modelsContent = fs.readFileSync(modelsPath, 'utf-8');
  
  // Extract all type names for this project
  const allTypes = extractAllTypeNames(modelsPath);
  console.log(`   Total types in project: ${allTypes.length}`);
  
  // Filter globally used types to only those that exist in this project
  const relevantUsedTypes = Array.from(globallyUsedTypes).filter(t => allTypes.includes(t));
  console.log(`   Directly used types (from any project): ${relevantUsedTypes.length}`);
  
  // Build dependency graph for this project
  console.log(`   Building dependency graph...`);
  const dependencies = {};
  
  for (const typeName of allTypes) {
    const typeFilePath = getTypeFilePath(projectPath, typeName, modelsContent);
    if (typeFilePath) {
      dependencies[typeName] = extractTypeDependencies(typeFilePath, allTypes);
    }
  }
  
  // Find all transitively used types
  console.log(`   Finding transitively used types...`);
  const allUsedTypes = new Set(relevantUsedTypes);
  const toProcess = [...relevantUsedTypes];
  
  while (toProcess.length > 0) {
    const current = toProcess.pop();
    const deps = dependencies[current] || [];
    
    for (const dep of deps) {
      if (!allUsedTypes.has(dep) && allTypes.includes(dep)) {
        allUsedTypes.add(dep);
        toProcess.push(dep);
      }
    }
  }
  
  console.log(`   Total used (including dependencies): ${allUsedTypes.size}`);
  
  // Calculate unused types
  const unusedTypes = allTypes.filter(t => !allUsedTypes.has(t));
  console.log(`   ✓ Unused types: ${unusedTypes.length} (${((unusedTypes.length / allTypes.length) * 100).toFixed(1)}%)`);
  
  return {
    projectName,
    totalTypes: allTypes.length,
    directlyUsed: relevantUsedTypes.sort(),
    allUsedTypes: Array.from(allUsedTypes).sort(),
    unusedTypes: unusedTypes.sort(),
    modelsPath
  };
}

// Main analysis
function analyzeAllProjects() {
  console.log('🔍 TikTok SDK Type Usage Analysis\n');
  console.log('=' .repeat(80));
  
  // First, collect all type names from all projects
  console.log('\n📚 Collecting all type definitions...');
  const allTypesAcrossProjects = new Set();
  
  for (const [projectName, projectPath] of Object.entries(PROJECTS)) {
    const modelsPath = path.join(projectPath, 'src/shared/interfaces/tiktok/models.ts');
    if (fs.existsSync(modelsPath)) {
      const types = extractAllTypeNames(modelsPath);
      types.forEach(t => allTypesAcrossProjects.add(t));
      console.log(`   ${projectName}: ${types.length} types`);
    }
  }
  
  console.log(`   Total unique types across all projects: ${allTypesAcrossProjects.size}`);
  
  // Find all directly used types across ALL projects
  const globallyUsedTypes = findDirectlyUsedTypes(PROJECTS, Array.from(allTypesAcrossProjects));
  
  // Now analyze each project
  const results = {};
  
  for (const [projectName, projectPath] of Object.entries(PROJECTS)) {
    const result = analyzeProject(projectPath, projectName, globallyUsedTypes);
    if (result) {
      results[projectName] = result;
    }
  }
  
  return { results, globallyUsedTypes: Array.from(globallyUsedTypes).sort() };
}

// Generate comprehensive report
function generateReport(data) {
  const { results, globallyUsedTypes } = data;
  
  console.log('\n\n');
  console.log('=' .repeat(80));
  console.log('📊 COMPREHENSIVE ANALYSIS REPORT');
  console.log('=' .repeat(80));
  
  console.log(`\n\n🌐 Global Summary`);
  console.log('-'.repeat(80));
  console.log(`Types directly used in application code (across all projects): ${globallyUsedTypes.length}`);
  
  console.log(`\n📋 Directly used types (in any application code):`);
  if (globallyUsedTypes.length <= 30) {
    globallyUsedTypes.forEach((type, idx) => {
      console.log(`   ${idx + 1}. ${type}`);
    });
  } else {
    globallyUsedTypes.slice(0, 30).forEach((type, idx) => {
      console.log(`   ${idx + 1}. ${type}`);
    });
    console.log(`   ... and ${globallyUsedTypes.length - 30} more`);
  }
  
  // Save globally used types
  const globalUsedFile = `/Users/behnam/.cursor/worktrees/tiktok-integration/4eWtC/globally-used-types.txt`;
  fs.writeFileSync(globalUsedFile, globallyUsedTypes.join('\n'));
  console.log(`\n📄 Full list saved to: globally-used-types.txt`);
  
  for (const [projectName, data] of Object.entries(results)) {
    console.log(`\n\n🏗️  Project: ${projectName}`);
    console.log('-'.repeat(80));
    console.log(`Total types: ${data.totalTypes}`);
    console.log(`Directly used in code: ${data.directlyUsed.length}`);
    console.log(`Used (including dependencies): ${data.allUsedTypes.length}`);
    console.log(`Unused (safe to delete): ${data.unusedTypes.length} (${((data.unusedTypes.length / data.totalTypes) * 100).toFixed(1)}%)`);
    
    // Save unused types to file
    const unusedFile = `/Users/behnam/.cursor/worktrees/tiktok-integration/4eWtC/unused-types-${projectName}.txt`;
    fs.writeFileSync(unusedFile, data.unusedTypes.join('\n'));
    console.log(`📄 Unused types list: unused-types-${projectName}.txt`);
    
    // Save used types to file  
    const usedFile = `/Users/behnam/.cursor/worktrees/tiktok-integration/4eWtC/used-types-${projectName}.txt`;
    fs.writeFileSync(usedFile, data.allUsedTypes.join('\n'));
    console.log(`📄 Used types list: used-types-${projectName}.txt`);
  }
  
  // Save detailed JSON report
  const jsonFile = '/Users/behnam/.cursor/worktrees/tiktok-integration/4eWtC/type-usage-analysis.json';
  fs.writeFileSync(jsonFile, JSON.stringify({ results, globallyUsedTypes }, null, 2));
  console.log(`\n\n💾 Detailed JSON report: type-usage-analysis.json`);
}

// Run the analysis
console.log('Starting comprehensive type usage analysis...\n');
const data = analyzeAllProjects();
generateReport(data);

console.log('\n\n✨ Analysis complete!\n');

