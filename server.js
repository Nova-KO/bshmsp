const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// MIME types mapping
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'application/octet-stream';
}

function serveFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - File Not Found</h1>');
      return;
    }
    
    const mimeType = getMimeType(filePath);
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  let pathname = url.parse(req.url).pathname;
  
  console.log(`Request: ${pathname}`);
  
  // Handle root path
  if (pathname === '/') {
    pathname = '/index.html';
  }
  
  // Handle blog directory
  if (pathname === '/blog/' || pathname === '/blog') {
    pathname = '/blog.html';
  }
  
  // If pathname doesn't have an extension and doesn't end with /, try .html
  const ext = path.extname(pathname);
  if (!ext && !pathname.endsWith('/')) {
    const htmlPath = pathname + '.html';
    const fullHtmlPath = path.join(__dirname, htmlPath);
    
    console.log(`Checking for: ${fullHtmlPath}`);
    
    if (fs.existsSync(fullHtmlPath)) {
      console.log(`Serving: ${htmlPath}`);
      serveFile(res, fullHtmlPath);
      return;
    }
  }
  
  // Otherwise, serve the file as requested
  const filePath = path.join(__dirname, pathname);
  console.log(`Serving direct: ${filePath}`);
  
  if (fs.existsSync(filePath)) {
    serveFile(res, filePath);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 - File Not Found</h1>');
  }
});

const port = process.argv[2] || 1222;

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
  console.log(`Current directory: ${__dirname}`);
  console.log('Press Ctrl+C to stop the server');
}); 