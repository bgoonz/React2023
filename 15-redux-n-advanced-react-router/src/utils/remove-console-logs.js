import fs from 'fs';
import path from 'path';

function removeConsoleLogs(dir) {
  // Read all files and directories in the given directory
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      // If the item is a directory, recursively search within it
      removeConsoleLogs(fullPath);
    } else if (
      stats.isFile() &&
      (item.endsWith('.js') || item.endsWith('.jsx'))
    ) {
      // If the item is a .js or .jsx file, process it
      const fileContent = fs.readFileSync(fullPath, 'utf8');

      // Use a regular expression to remove all console.log statements
      const newContent = fileContent.replace(/console\.log\([^)]*\);?/g, '');

      // Write the modified content back to the file
      fs.writeFileSync(fullPath, newContent);
    }
  });
}

// Start the process from the desired directory (e.g., './src')
removeConsoleLogs('./../../src');
