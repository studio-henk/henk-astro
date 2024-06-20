const fs = require('fs');

// Read command line arguments
const [, , astroComponentFilePath] = process.argv;

// Read the content of the Astro component file
const astroComponentContent = fs.readFileSync(astroComponentFilePath, 'utf8');

// Split the content into lines
const lines = astroComponentContent.split('\n');

// Initialize an array to store const declarations
const constDeclarations = [];

// Flag to track if we're inside a const block
let insideConstBlock = false;

// Iterate over each line
lines.forEach(line => {
    // Check if we're inside a const block
    if (insideConstBlock) {
        // Check if the line contains an assignment
        if (line.includes('=')) {
            // Split the line by '=' to extract the property name and default value
            const [propPart, defaultValuePart] = line.split('=');
            const prop = propPart.trim().replace(/[{},]/g, ''); // Extract and clean up the property name
            let defaultValue = defaultValuePart.trim().replace(/[};']/g, ''); // Extract and clean up the default value
            defaultValue = defaultValue.endsWith(',') ? defaultValue.slice(0, -1) : defaultValue; // Remove trailing comma if present
            constDeclarations.push({ prop, defaultValue }); // Store the property name and default value
        } else if (line.trim() === '}') {
            // If we encounter '}' and were inside a const block, reset the flag
            insideConstBlock = false;
        }
    } else if (line.trim().startsWith('const {')) {
        // If the line starts a const block, set the flag to indicate we're inside a const block
        insideConstBlock = true;
    }
});

// Filter out the entries where prop is empty
const filteredConstDeclarations = constDeclarations.filter(declaration => declaration.prop !== '');

console.log("Const Declarations:", filteredConstDeclarations);

// const jsonString = JSON.stringify(filteredConstDeclarations, null, 2);
// console.log(jsonString);
