const https = require('https');
require('dotenv').config();

// Utility function that downloads a URL and invokes
// callback with the data.
function download(host, url, cookies, callback) {
    var reqData = "";
    var headers = {
        'Host': host,
        'Cookie': cookies,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data, 'utf8')
    };
    var options = {
        hostname: host,
        port: 443,
        path: url,
        method: 'GET',
        headers: headers
    };
    var data = "";
    var req = https.request(options, (res) => {
        console.log('statusCode: ', res.statusCode);
        console.log('headers: ', res.headers);

        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            callback(data);
        });
    });
    req.end();
    req.on("error", (e) => {
        console.error(e);
        callback(null);
    });

}

download(process.env.HOSTNAME, process.env.URI, process.env.COOKIESTRING, function (data) {
    if (data) {
        console.log(data);
    } else console.log("error");
});
