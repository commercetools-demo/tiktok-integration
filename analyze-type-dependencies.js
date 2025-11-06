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
function extractTypeDependencies(typeFilePath) {
  if (!fs.existsSync(typeFilePath)) {
    return [];
  }
  
  const content = fs.readFileSync(typeFilePath, 'utf-8');
  const dependencies = new Set();
  
  // Match imports from the same tiktok types directory
  const importPattern = /import.*?from\s+['"]\.\.?\/.+?\/([^'"\/]+)['"]/g;
  let match;
  
  while ((match = importPattern.exec(content)) !== null) {
    dependencies.add(match[1]);
  }
  
  // Also look for type references within the file (referenced types might not be imported in some cases)
  const typeRefPattern = /:\s*([A-Z][a-zA-Z0-9]+)/g;
  while ((match = typeRefPattern.exec(content)) !== null) {
    const typeName = match[1];
    // Filter out common non-TikTok types
    if (!['Array', 'String', 'Number', 'Boolean', 'Date', 'Promise', 'Record', 'Partial', 'Required'].includes(typeName)) {
      dependencies.add(typeName);
    }
  }
  
  return Array.from(dependencies);
}

// Function to find directly used types (used in application code)
function findDirectlyUsedTypes(projectPath, allTypes) {
  const directlyUsed = new Set();
  
  // Search in application code (excluding interfaces directory)
  for (const typeName of allTypes) {
    try {
      const command = `grep -r "\\b${typeName}\\b" "${projectPath}/src" --include="*.ts" --include="*.tsx" --exclude-dir="interfaces" 2>/dev/null || true`;
      const result = execSync(command, { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
      
      const lines = result.split('\n').filter(line => {
        return line.trim() && 
               !line.includes('models.ts') && 
               !line.includes('/interfaces/') &&
               !line.includes(`export * from`) &&
               !line.includes(`export type`);
      });
      
      if (lines.length > 0) {
        directlyUsed.add(typeName);
      }
    } catch (error) {
      // Ignore errors
    }
  }
  
  return directlyUsed;
}

// Function to build complete dependency graph and find all transitively used types
function findAllUsedTypes(projectPath, projectName) {
  console.log(`\n📊 Analyzing dependencies for ${projectName}...`);
  console.log('-'.repeat(80));
  
  const modelsPath = path.join(projectPath, 'src/shared/interfaces/tiktok/models.ts');
  const modelsContent = fs.readFileSync(modelsPath, 'utf-8');
  
  // Extract all type names
  const allTypes = [];
  const exportPattern = /export \* from ['"](.+\/([^'"\/]+))['"]/g;
  let match;
  
  while ((match = exportPattern.exec(modelsContent)) !== null) {
    allTypes.push(match[2]);
  }
  
  console.log(`   Total types: ${allTypes.length}`);
  
  // Find types directly used in application code
  console.log(`   Finding directly used types...`);
  const directlyUsed = findDirectlyUsedTypes(projectPath, allTypes);
  console.log(`   Directly used: ${directlyUsed.size}`);
  
  // Build dependency graph
  console.log(`   Building dependency graph...`);
  const dependencies = {};
  
  for (const typeName of allTypes) {
    const typeFilePath = getTypeFilePath(projectPath, typeName, modelsContent);
    if (typeFilePath) {
      dependencies[typeName] = extractTypeDependencies(typeFilePath);
    }
  }
  
  // Find all transitively used types
  console.log(`   Finding transitively used types...`);
  const allUsedTypes = new Set(directlyUsed);
  const toProcess = Array.from(directlyUsed);
  
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
  console.log(`   Unused types: ${unusedTypes.length}`);
  
  return {
    projectName,
    totalTypes: allTypes.length,
    directlyUsed: Array.from(directlyUsed).sort(),
    allUsedTypes: Array.from(allUsedTypes).sort(),
    unusedTypes: unusedTypes.sort(),
    dependencies
  };
}

// Main analysis
function analyzeAllProjects() {
  console.log('🔍 TikTok SDK Type Dependency Analysis\n');
  console.log('=' .repeat(80));
  
  const results = {};
  
  for (const [projectName, projectPath] of Object.entries(PROJECTS)) {
    results[projectName] = findAllUsedTypes(projectPath, projectName);
  }
  
  return results;
}

// Generate comprehensive report
function generateReport(results) {
  console.log('\n\n');
  console.log('=' .repeat(80));
  console.log('📊 COMPREHENSIVE DEPENDENCY ANALYSIS REPORT');
  console.log('=' .repeat(80));
  
  for (const [projectName, data] of Object.entries(results)) {
    console.log(`\n\n🏗️  Project: ${projectName}`);
    console.log('-'.repeat(80));
    console.log(`Total types: ${data.totalTypes}`);
    console.log(`Directly used in code: ${data.directlyUsed.length}`);
    console.log(`Used (including dependencies): ${data.allUsedTypes.length}`);
    console.log(`Unused (safe to delete): ${data.unusedTypes.length} (${((data.unusedTypes.length / data.totalTypes) * 100).toFixed(1)}%)`);
    
    console.log(`\n📋 Directly used types:`);
    if (data.directlyUsed.length <= 20) {
      data.directlyUsed.forEach((type, idx) => {
        console.log(`   ${idx + 1}. ${type}`);
      });
    } else {
      data.directlyUsed.slice(0, 20).forEach((type, idx) => {
        console.log(`   ${idx + 1}. ${type}`);
      });
      console.log(`   ... and ${data.directlyUsed.length - 20} more`);
    }
    
    // Save unused types to file
    const unusedFile = `/Users/behnam/.cursor/worktrees/tiktok-integration/4eWtC/unused-types-final-${projectName}.txt`;
    fs.writeFileSync(unusedFile, data.unusedTypes.join('\n'));
    console.log(`\n📄 Full unused types list saved to: unused-types-final-${projectName}.txt`);
    
    // Save used types to file
    const usedFile = `/Users/behnam/.cursor/worktrees/tiktok-integration/4eWtC/used-types-${projectName}.txt`;
    fs.writeFileSync(usedFile, data.allUsedTypes.join('\n'));
    console.log(`📄 All used types list saved to: used-types-${projectName}.txt`);
  }
  
  // Save detailed JSON report
  const jsonFile = '/Users/behnam/.cursor/worktrees/tiktok-integration/4eWtC/type-dependency-analysis.json';
  fs.writeFileSync(jsonFile, JSON.stringify(results, null, 2));
  console.log(`\n\n💾 Detailed JSON report saved to: type-dependency-analysis.json`);
}

// Run the analysis
console.log('Starting comprehensive dependency analysis...\n');
const results = analyzeAllProjects();
generateReport(results);

console.log('\n\n✨ Analysis complete!\n');

