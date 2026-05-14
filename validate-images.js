// Image validation script
import fs from 'fs';
import path from 'path';

const content = fs.readFileSync('./src/data/products.js', 'utf-8');

// Extract all image URLs
const urlRegex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+\?w=\d+&q=\d+/g;
const urls = content.match(urlRegex) || [];

console.log('\n📊 Image URL Analysis\n');
console.log(`Total URLs found: ${urls.length}`);

// Count occurrences
const urlCounts = {};
urls.forEach(url => {
  urlCounts[url] = (urlCounts[url] || 0) + 1;
});

// Find duplicates
const duplicates = Object.entries(urlCounts).filter(([, count]) => count > 1);

if (duplicates.length === 0) {
  console.log('✅ No duplicate URLs found!');
} else {
  console.log(`\n❌ Found ${duplicates.length} duplicate URL patterns:\n`);
  duplicates.forEach(([url, count]) => {
    console.log(`  ${count}x ${url.substring(0, 80)}...`);
    
    // Find which products use this URL
    const lines = content.split('\n');
    let productName = '';
    lines.forEach((line, idx) => {
      if (line.includes(url)) {
        // Look backward for product name
        for (let i = idx; i >= Math.max(0, idx - 3); i--) {
          if (lines[i].includes('"') && !lines[i].includes('https')) {
            productName = lines[i].match(/"([^"]+)"/)?.[1] || 'Unknown';
            console.log(`     → Line ${idx + 1}: ${productName}`);
            break;
          }
        }
      }
    });
  });
}

// Count unique URLs
const uniqueUrls = new Set(urls);
console.log(`\nUnique URLs: ${uniqueUrls.size} / ${urls.length}`);
console.log(`Duplicate URLs: ${urls.length - uniqueUrls.size}\n`);
