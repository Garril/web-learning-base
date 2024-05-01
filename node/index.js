// 1. Import the necessary modules
const fs = require('fs');

// 2. Read the CSS file
const cssFilePath = './start.txt'; // Replace with the actual file path
const cssContent = fs.readFileSync(cssFilePath, 'utf8');

// 3. Define the conversion function from px to rem
function pxToRem(pxValue) {
  const baseFontSize = 16; // Root font size in pixels
  const remValue = pxValue / baseFontSize;
  return remValue + 'rem';
}

// 4. Find all px values in the CSS file and convert them to rem
const pxRegex = /(\d*\.?\d+)px/g; // Regular expression to match px values
const remContent = cssContent.replace(pxRegex, (match, pxValue) => {
  const remValue = pxToRem(parseFloat(pxValue));
  return remValue;
});

// 5. Write the converted content to a new file
const remFilePath = './res.txt'; // Replace with the desired file path
fs.writeFileSync(remFilePath, remContent, 'utf8');

// 6. Display success message
console.log('Conversion from px to rem complete. Rem file saved at: ' + remFilePath);
