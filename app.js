var http = require("http"),
	path = require("path")
	fs = require("fs");
extensions = {
	".html": "text/html",
	".css": "text/css",
	".js": "application/javascript",
	".png": "image/png",
	".gif": "image/gif",
	".jpg": "image/jpeg"
};

http.createServer(function(req, res) {
	var filename = path.basename(req.url) || "index.html",
	ext = path.extname(filename),
	dir = path.dirname(req.url).substring(1),
	localPath = __dirname + "/public/";
	console.log(filename);
	console.log(ext);
	if(extensions[ext]) {
		localPath += (dir ? dir + "/" : "") + filename;
		//verify that this file actually exists and load it
		fs.exists(localPath, function(exists) {
			if(exists) {
				getFile(localPath, extensions[ext], res);
			} else {
				res.writeHead(404);
				res.end();
			}
		fs.writeFile("logFile", "it worked", function(err) {
			if(err) {
				throw err;
				console.log("its saved!");
			}
		});
		});
	}
}).listen(8000);

function getFile(localPath, mimetype, res) {
	fs.readFile(localPath, function(err, contents) {
		if(!err) {
			res.writeHead(200, {
				"Content-Type": mimetype,
				"Content-Length": contents.length
			});
			res.end(contents);
		} else {
			res.writeHead(500);
			res.end();
		}
	})
}