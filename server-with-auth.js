const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const cookieParser = require('cookie-parser');

// Import authentication endpoints
const { 
    loginEndpoint, 
    passwordResetEndpoint, 
    logoutEndpoint, 
    verifySessionEndpoint 
} = require('./api/auth');

// Import team management endpoints
const {
    getAllMembers,
    getActiveMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember,
    toggleMemberStatus,
    uploadImage
} = require('./api/team');

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

// Parse request body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

// Parse cookies
function parseCookies(req) {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return {};
  
  const cookies = {};
  cookieHeader.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) {
      cookies[name] = decodeURIComponent(value);
    }
  });
  return cookies;
}

const server = http.createServer(async (req, res) => {
  let pathname = url.parse(req.url).pathname;
  
  console.log(`Request: ${req.method} ${pathname}`);
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Session-Token');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Parse cookies
  req.cookies = parseCookies(req);
  
  // Handle API endpoints
  if (pathname === '/api/auth/login' && req.method === 'POST') {
    try {
      const body = await parseBody(req);
      req.body = body;
      await loginEndpoint(req, res);
      return;
    } catch (error) {
      console.error('Login error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Internal server error' }));
      return;
    }
  }
  
  if (pathname === '/api/auth/password-reset' && req.method === 'POST') {
    try {
      const body = await parseBody(req);
      req.body = body;
      await passwordResetEndpoint(req, res);
      return;
    } catch (error) {
      console.error('Password reset error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Internal server error' }));
      return;
    }
  }
  
  if (pathname === '/api/auth/logout' && req.method === 'POST') {
    logoutEndpoint(req, res);
    return;
  }
  
           if (pathname === '/api/auth/verify' && req.method === 'GET') {
           verifySessionEndpoint(req, res);
           return;
         }
         
         // Team management endpoints
         if (pathname === '/api/team/members' && req.method === 'GET') {
           getAllMembers(req, res);
           return;
         }
         
         if (pathname === '/api/team/members/active' && req.method === 'GET') {
           getActiveMembers(req, res);
           return;
         }
         
         if (pathname === '/api/team/members' && req.method === 'POST') {
           try {
             const body = await parseBody(req);
             req.body = body;
             createMember(req, res);
             return;
           } catch (error) {
             console.error('Create member error:', error);
             res.writeHead(500, { 'Content-Type': 'application/json' });
             res.end(JSON.stringify({ success: false, message: 'Internal server error' }));
             return;
           }
         }
         
         if (pathname.match(/^\/api\/team\/members\/[^\/]+$/) && req.method === 'GET') {
           const id = pathname.split('/').pop();
           req.params = { id };
           getMemberById(req, res);
           return;
         }
         
         if (pathname.match(/^\/api\/team\/members\/[^\/]+$/) && req.method === 'PUT') {
           try {
             const body = await parseBody(req);
             req.body = body;
             const id = pathname.split('/').pop();
             req.params = { id };
             updateMember(req, res);
             return;
           } catch (error) {
             console.error('Update member error:', error);
             res.writeHead(500, { 'Content-Type': 'application/json' });
             res.end(JSON.stringify({ success: false, message: 'Internal server error' }));
             return;
           }
         }
         
         if (pathname.match(/^\/api\/team\/members\/[^\/]+$/) && req.method === 'DELETE') {
           const id = pathname.split('/').pop();
           req.params = { id };
           deleteMember(req, res);
           return;
         }
         
         if (pathname.match(/^\/api\/team\/members\/[^\/]+\/toggle$/) && req.method === 'POST') {
           try {
             const body = await parseBody(req);
             req.body = body;
             const id = pathname.split('/')[4];
             req.params = { id };
             toggleMemberStatus(req, res);
             return;
           } catch (error) {
             console.error('Toggle member status error:', error);
             res.writeHead(500, { 'Content-Type': 'application/json' });
             res.end(JSON.stringify({ success: false, message: 'Internal server error' }));
             return;
           }
         }
  
  // Handle root path
  if (pathname === '/') {
    pathname = '/index.html';
  }
  
  // Handle directory paths - redirect to .html files
  if (pathname === '/blog/' || pathname === '/blog') {
    console.log(`Blog redirect: redirecting to /blog.html`);
    res.writeHead(301, { 'Location': '/blog.html' });
    res.end();
    return;
  }
  
  if (pathname === '/about/' || pathname === '/about') {
    console.log(`About redirect: redirecting to /about.html`);
    res.writeHead(301, { 'Location': '/about.html' });
    res.end();
    return;
  }
  
  if (pathname === '/pricing/' || pathname === '/pricing') {
    console.log(`Pricing redirect: redirecting to /pricing.html`);
    res.writeHead(301, { 'Location': '/pricing.html' });
    res.end();
    return;
  }
  
  if (pathname === '/wall-of-love/' || pathname === '/wall-of-love') {
    console.log(`Wall of Love redirect: redirecting to /wall-of-love.html`);
    res.writeHead(301, { 'Location': '/wall-of-love.html' });
    res.end();
    return;
  }
  
  if (pathname === '/contact/' || pathname === '/contact') {
    console.log(`Contact redirect: redirecting to /contact.html`);
    res.writeHead(301, { 'Location': '/contact.html' });
    res.end();
    return;
  }
  
  // Handle services paths
  if (pathname.startsWith('/services/')) {
    const serviceName = pathname.replace('/services/', '');
    if (serviceName && !serviceName.includes('.')) {
      const htmlPath = `/services/${serviceName}.html`;
      const fullHtmlPath = path.join(__dirname, htmlPath);
      
      console.log(`Checking for service: ${fullHtmlPath}`);
      
      if (fs.existsSync(fullHtmlPath)) {
        console.log(`Serving service: ${htmlPath}`);
        serveFile(res, fullHtmlPath);
        return;
      }
    }
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
  console.log(`Server with authentication running at http://localhost:${port}/`);
  console.log(`Current directory: ${__dirname}`);
  console.log('Press Ctrl+C to stop the server');
  console.log('Available API endpoints:');
  console.log('  POST /api/auth/login');
  console.log('  POST /api/auth/password-reset');
  console.log('  POST /api/auth/logout');
  console.log('  GET  /api/auth/verify');
}); 