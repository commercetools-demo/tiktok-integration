#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths to the three projects
const PROJECTS = [
  '/Users/behnam/.cursor/worktrees/tiktok-integration/4eWtC/event',
  '/Users/behnam/.cursor/worktrees/tiktok-integration/4eWtC/service',
  '/Users/behnam/.cursor/worktrees/tiktok-integration/4eWtC/refresh-token-job'
];

// Function to extract all type names from models.ts
function extractTypeNamesFromModels(modelsPath) {
  console.log(`\n📖 Reading ${modelsPath}...`);
  const content = fs.readFileSync(modelsPath, 'utf-8');
  const lines = content.split('\n');
  
  const typeNames = [];
  const exportPattern = /export \* from ['"](.+)['"]/;
  
  for (const line of lines) {
    const match = line.match(exportPattern);
    if (match) {
      const relativePath = match[1];
      // Extract the type name (filename without extension)
      const typeName = path.basename(relativePath);
      if (typeName && !typeName.includes('*')) {
        typeNames.push(typeName);
      }
    }
  }
  
  console.log(`   Found ${typeNames.length} exported types`);
  return typeNames;
}

// Function to search for type usage across a project
function searchTypeUsage(projectPath, typeName) {
  try {
    // Search for the type name in TypeScript files, excluding node_modules, build, and shared/interfaces directories
    // We exclude shared/interfaces because we only want to find usage in application code, not in type definitions
    const command = `grep -r "${typeName}" "${projectPath}/src" --include="*.ts" --include="*.tsx" --exclude-dir="interfaces" 2>/dev/null || true`;
    const result = execSync(command, { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
    
    // Filter out lines from type definition files and export statements
    const lines = result.split('\n').filter(line => {
      return line.trim() && 
             !line.includes('models.ts') && 
             !line.includes('/interfaces/') &&
             !line.includes('/shared/interfaces/') &&
             !line.includes(`export * from`) &&
             !line.includes(`export { ${typeName} }`) &&
             !line.includes(`export type`);
    });
    
    return lines;
  } catch (error) {
    return [];
  }
}

// Main analysis function
function analyzeUnusedTypes() {
  console.log('🔍 TikTok SDK Type Usage Analysis\n');
  console.log('=' .repeat(80));
  
  const results = {};
  
  // Analyze each project
  for (const projectPath of PROJECTS) {
    const projectName = path.basename(projectPath);
    console.log(`\n\n📦 Analyzing project: ${projectName}`);
    console.log('-'.repeat(80));
    
    const modelsPath = path.join(projectPath, 'src/shared/interfaces/tiktok/models.ts');
    
    if (!fs.existsSync(modelsPath)) {
      console.log(`   ⚠️  models.ts not found at ${modelsPath}`);
      continue;
    }
    
    const typeNames = extractTypeNamesFromModels(modelsPath);
    
    console.log(`\n🔎 Searching for type usages across all projects...`);
    
    const unusedTypes = [];
    const usedTypes = [];
    
    for (let i = 0; i < typeNames.length; i++) {
      const typeName = typeNames[i];
      
      // Progress indicator
      if (i % 100 === 0) {
        console.log(`   Progress: ${i}/${typeNames.length} types checked...`);
      }
      
      let foundInAnyProject = false;
      const usageDetails = {};
      
      // Check usage in all projects
      for (const searchProjectPath of PROJECTS) {
        const usages = searchTypeUsage(searchProjectPath, typeName);
        const searchProjectName = path.basename(searchProjectPath);
        
        if (usages.length > 0) {
          foundInAnyProject = true;
          usageDetails[searchProjectName] = usages.length;
        }
      }
      
      if (!foundInAnyProject) {
        unusedTypes.push(typeName);
      } else {
        usedTypes.push({ name: typeName, usage: usageDetails });
      }
    }
    
    results[projectName] = {
      total: typeNames.length,
      used: usedTypes.length,
      unused: unusedTypes.length,
      unusedTypes: unusedTypes,
      usedTypes: usedTypes
    };
    
    console.log(`\n✅ Analysis complete for ${projectName}`);
    console.log(`   Total types: ${typeNames.length}`);
    console.log(`   Used types: ${usedTypes.length}`);
    console.log(`   Unused types: ${unusedTypes.length}`);
  }
  
  return results;
}

// Generate report
function generateReport(results) {
  console.log('\n\n');
  console.log('=' .repeat(80));
  console.log('📊 ANALYSIS REPORT');
  console.log('=' .repeat(80));
  
  for (const [projectName, data] of Object.entries(results)) {
    console.log(`\n\n🏗️  Project: ${projectName}`);
    console.log('-'.repeat(80));
    console.log(`Total types: ${data.total}`);
    console.log(`Used types: ${data.used} (${((data.used / data.total) * 100).toFixed(1)}%)`);
    console.log(`Unused types: ${data.unused} (${((data.unused / data.total) * 100).toFixed(1)}%)`);
    
    if (data.unused > 0) {
      console.log(`\n🗑️  Unused types (first 50):`);
      const displayTypes = data.unusedTypes.slice(0, 50);
      displayTypes.forEach((typeName, idx) => {
        console.log(`   ${idx + 1}. ${typeName}`);
      });
      
      if (data.unusedTypes.length > 50) {
        console.log(`   ... and ${data.unusedTypes.length - 50} more`);
      }
      
      // Save full list to file
      const outputFile = `/Users/behnam/.cursor/worktrees/tiktok-integration/4eWtC/unused-types-${projectName}.txt`;
      fs.writeFileSync(outputFile, data.unusedTypes.join('\n'));
      console.log(`\n   📄 Full list saved to: unused-types-${projectName}.txt`);
    }
  }
  
  // Save detailed JSON report
  const jsonOutputFile = '/Users/behnam/.cursor/worktrees/tiktok-integration/4eWtC/type-analysis-report.json';
  fs.writeFileSync(jsonOutputFile, JSON.stringify(results, null, 2));
  console.log(`\n\n💾 Detailed JSON report saved to: type-analysis-report.json`);
}

// Run the analysis
console.log('Starting analysis...\n');
const results = analyzeUnusedTypes();
generateReport(results);

console.log('\n\n✨ Analysis complete!\n');

