const fs = require('fs');
const path = require('path');

const talksFilePath = path.join(__dirname, 'data', 'talks.json');
const publicDir = path.join(__dirname, 'public');
const distDir = path.join(__dirname, 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

const talks = JSON.parse(fs.readFileSync(talksFilePath, 'utf-8'));
const html = fs.readFileSync(path.join(publicDir, 'index.html'), 'utf-8');
const css = fs.readFileSync(path.join(publicDir, 'styles.css'), 'utf-8');
const js = fs.readFileSync(path.join(publicDir, 'script.js'), 'utf-8');

const finalHtml = html
  .replace('<link rel="stylesheet" href="styles.css">', `<style>${css}</style>`)
  .replace('<script src="script.js"></script>', `<script id="talksData" type="application/json">${JSON.stringify(talks)}</script><script>${js}</script>`);

fs.writeFileSync(path.join(distDir, 'index.html'), finalHtml);

console.log('Build complete! Your serverless website is ready in the /dist folder.');
