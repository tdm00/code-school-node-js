var fs = require('fs');
var http = require('http');
var os = require('os');

var server = http.createServer(function(request, response) {
  var newFile = fs.createWriteStream("readme_copy.md");
  var fileBytes = request.headers['content-length'];
  var uploadedBytes = 0;

  request.pipe(newFile);

  request.on('data', function(chunk) {
    uploadedBytes += chunk.length;
    var progress = (uploadedBytes / fileBytes) * 100;
    response.write("progress: " + parseInt(progress,10) + "%\n");
  });

  request.on('end', function() {
    response.end('uploaded!');
  });
}).listen(8080);

server.on('connection', function() {
  console.log('New connection established!');
  console.log('This hostname is ' + os.hostname());
  console.log('This type is ' + os.type());
  console.log('This platform is ' + os.platform());
  console.log('This architecture is ' + os.arch());
  console.log('This release is ' + os.release());
  console.log('This uptime is ' + os.uptime());
  console.log('This total memory is ' + os.totalmem());
  console.log('This free memory is ' + os.freemem());
});
