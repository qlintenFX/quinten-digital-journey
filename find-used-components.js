const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Directory containing UI components
const UI_DIR = path.join(__dirname, 'src', 'components', 'ui');
// Project source code directory
const SRC_DIR = path.join(__dirname, 'src');

// Get list of all UI component files
const uiComponentFiles = fs.readdirSync(UI_DIR)
  .filter(file => file.endsWith('.tsx') || file.endsWith('.jsx'))
  .map(file => path.basename(file, path.extname(file)));

console.log(`Found ${uiComponentFiles.length} UI components`);

// For each component, check if it's used in the project
const results = {};

// Function to check component usage
function checkComponentUsage(componentName) {
  return new Promise((resolve, reject) => {
    // Using grep to search for imports or usages of the component
    const grepCommand = `grep -r --include="*.tsx" --include="*.jsx" --include="*.ts" --include="*.js" "(from ['\\\"].*${componentName}['\\\"]|['\\\"]@/components/ui/${componentName}['\\\"])" "${SRC_DIR}" | grep -v "${componentName}.tsx" | grep -v "${componentName}.jsx"`;
    
    exec(grepCommand, (error, stdout, stderr) => {
      if (error && error.code !== 1) {
        // Grep returns error code 1 when no matches found, which is normal
        console.error(`Error checking usage for ${componentName}:`, stderr);
        reject(error);
        return;
      }
      
      const matches = stdout.trim().split('\n').filter(Boolean);
      results[componentName] = {
        used: matches.length > 0,
        matches: matches
      };
      
      resolve();
    });
  });
}

// Process all components and generate report
async function generateReport() {
  for (const component of uiComponentFiles) {
    try {
      await checkComponentUsage(component);
      process.stdout.write('.');
    } catch (err) {
      console.error(`\nError processing ${component}`);
    }
  }
  
  console.log('\n\nComponent Usage Report:');
  console.log('======================\n');
  
  const usedComponents = Object.entries(results)
    .filter(([_, data]) => data.used)
    .map(([name]) => name);
    
  const unusedComponents = Object.entries(results)
    .filter(([_, data]) => !data.used)
    .map(([name]) => name);
  
  console.log(`Used Components (${usedComponents.length}):`);
  console.log(usedComponents.join(', '));
  console.log('\n');
  
  console.log(`Potentially Unused Components (${unusedComponents.length}):`);
  console.log(unusedComponents.join(', '));
  console.log('\n');
  
  // Write results to files
  fs.writeFileSync('used-components.json', JSON.stringify(usedComponents, null, 2));
  fs.writeFileSync('unused-components.json', JSON.stringify(unusedComponents, null, 2));
  
  console.log('Reports saved to used-components.json and unused-components.json');
}

generateReport().catch(console.error); 