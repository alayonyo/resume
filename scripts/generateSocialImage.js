const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create a 1200x630 canvas for social media sharing
const width = 1200;
const height = 630;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Background gradient
const gradient = ctx.createLinearGradient(0, 0, width, height);
gradient.addColorStop(0, '#1e40af'); // blue-800
gradient.addColorStop(1, '#3b82f6'); // blue-500
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

// Add some geometric shapes for visual interest
ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
ctx.beginPath();
ctx.arc(1000, 100, 200, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.arc(200, 500, 150, 0, Math.PI * 2);
ctx.fill();

// Name
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 80px sans-serif';
ctx.textAlign = 'center';
ctx.fillText('Yonatan Ayalon', width / 2, height / 2 - 40);

// Title
ctx.font = '40px sans-serif';
ctx.fillStyle = '#e0e7ff'; // blue-100
ctx.fillText('Senior Front-End Software Engineer', width / 2, height / 2 + 40);

// Subtitle
ctx.font = '30px sans-serif';
ctx.fillStyle = '#bfdbfe'; // blue-200
ctx.fillText(
  'React • TypeScript • Frontend Architecture',
  width / 2,
  height / 2 + 100
);

// Save the image
const buffer = canvas.toBuffer('image/png');
const outputPath = path.join(__dirname, '..', 'public', 'og-image.png');
fs.writeFileSync(outputPath, buffer);

console.log('✅ Social sharing image created at:', outputPath);
