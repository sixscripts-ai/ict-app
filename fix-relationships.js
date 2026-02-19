const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/ict/relationships.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace 'source:' with 'sourceId:' and 'target:' with 'targetId:'
// But be careful not to replace in comments or strings that might mention these words
content = content.replace(/(\s+)source: (['"])/g, '$1sourceId: $2');
content = content.replace(/(\s+)target: (['"])/g, '$1targetId: $2');

// Add createdAt to each relationship object if it doesn't have one
// Find pattern: metadata block ending with }, then }, (next object or end array)
content = content.replace(/(\s+updatedAt: timestamp\s+}\s+)(})(,?\s+{)/g, '$1$2,\n    createdAt: timestamp$3');
content = content.replace(/(\s+updatedAt: timestamp\s+}\s+)(}\s+\])/g, '$1,\n    createdAt: timestamp\n  $2');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed relationships.ts');
