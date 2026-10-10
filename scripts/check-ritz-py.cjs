const fs = require('fs');
const content = fs.readFileSync('scripts/data_ritz_carlton.py', 'utf8');

const matches = [];
const regex = /"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)",/g;
let m;
while ((m = regex.exec(content)) !== null) {
  matches.push({ id: m[1], name: m[2] });
}
console.log('Total properties in data_ritz_carlton.py:', matches.length);
console.log('Sample:', matches.slice(0, 10));
