const fs = require('fs');
const code = fs.readFileSync('src/components/BookingForm.jsx', 'utf8');
const lines = code.split('\n');
let balance = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let j = 0; j < line.length; j++) {
    if (line[j] === '{') balance++;
    if (line[j] === '}') {
      balance--;
      if (i >= 775 && i <= 785) {
        console.log('Line ' + (i+1) + ': balance=' + balance + ' char=\"}\"');
      }
    }
  }
}
console.log('Final balance after line 785:', balance);