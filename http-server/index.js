const http = require('http');
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');
const args = minimist(process.argv.slice(2));
const PORT = args.port || 3000; 
const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} received`);
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(path.join(__dirname, 'home.html')).pipe(res);
    } else if (req.url === '/registration') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(path.join(__dirname, 'registration.html')).pipe(res);
    } else if (req.url === '/project') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(path.join(__dirname, 'project.html')).pipe(res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
