const fs = require('fs');

// Read command line arguments
const [, , astroComponentFilePath] = process.argv;

// Read the content of the Astro component file
const astroComponentContent = fs.readFileSync(astroComponentFilePath, 'utf8');

// Split the content into lines
const lines = astroComponentContent.split('\n');

// Initialize an array to store the props
let props = [];

// Initialize a variable to store the template HTML
let templateHTML = '';

// Flag to track if we're after the closing frontmatter dashes
let afterClosingDashes = false;

// Iterate over each line
lines.forEach(line => {
    // Check if we're after the closing frontmatter dashes
    if (afterClosingDashes) {
        templateHTML += line + '\n'; // Append the line to the template HTML
    } else if (line.trim() === '---') {
        afterClosingDashes = true; // Set the flag to true when we encounter the closing dashes
    } else if (line.trim().startsWith('const {')) {
        // Parse props from the const declaration
        const propsMatch = line.match(/\{(.+?)\}/);
        if (propsMatch) {
            const propsList = propsMatch[1].split(',').map(prop => prop.trim().split('=')[0]);
            props = propsList.filter(prop => prop !== ''); // Filter out empty props
        }
    }
});

console.log("Props:", props);
console.log("Template HTML:", templateHTML);
