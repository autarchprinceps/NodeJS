const http2 = require('http2');
const fs = require('fs');
const cert = fs.readFileSync('my.cert');
const key = fs.readFileSync('my.key')
const server = http2.createSecureServer({cert, key});

server.on('stream', (stream, headers) => {
  console.log('Stream');
  stream.respond({':status': 200});
  stream.end('hello world');
});

server.listen(8443);
