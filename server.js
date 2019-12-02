const http = require("http"),
  fs = require("fs"),
  url = require("url");

http
  .createServer((request, response) => {
    var addr = request.url,
      q = url.parse(addr, true);
    (filePath = ""),
    response.end("Hello\n" + addr);

    if (q.pathname.includes("documentation")) {
      filePath = __dirname + "/documentation.html";
    } else {
      filePath = "index.html";
    }

    // fs.readFile(filePath, function(err, data) {
    //   if (err) {
    //     throw err;
    //   }
    //
    //   response.writeHead(200, { "Content-Type": "text/html" });
    //   response.write(data);
    //   response.end();
    // });

    fs.appendFile(
      "log.txt",
      "URL: " + addr + "\nTimestamp: " + new Date() + "\n\n",
      function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log(addr + " Added to log.");
        }
      }
    );
  })
  .listen(8080);
console.log("Node test server is running on http://127.0.0.1:8080/");
