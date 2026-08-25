require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');

const bingKey = process.env.BING_VERIFICATION_KEY;

if (bingKey) {
  const filePath = path.join('public', `${bingKey}.txt`);
  fs.writeFileSync(filePath, bingKey);
  console.log(`✅ Generated: ${bingKey}.txt`);
} else {
  console.log('⚠️ BING_VERIFICATION_KEY not found');
}