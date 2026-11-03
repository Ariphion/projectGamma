const fs = require('fs');
const path = require('path');

const requiredFiles = ['index.html', 'about.html', 'contact.html', 'style.css'];

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.error(`TEST FAILED: Missing required file: ${file}`);
    process.exit(1);
  }
});

console.log('ALL TESTS PASSED: Required project files are present!');
process.exit(0);