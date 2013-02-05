var http = require('http');
var url = require('url');
var fs = require('fs');

var deliverDownload = function (res, mapping, data) {
    var contentDisposition = mapping.forceDownload ?
        'attachment' : 'inline';
    res.writeHead(data.statusCode, {
        'Content-Type': mapping.contentType,
        'Content-Disposition': contentDisposition +
            '; filename=' + mapping.fileName + ';'
    });
    data.pipe(res);
}

var actions = {
    'redirect': function (res, mapping) {
        var statusCode = mapping.type === 'permanent' ? 301 : 307;
        res.writeHead(statusCode, {
            'Location': mapping.url
        });
        res.end();
    },
    'download': function (res, mapping) {
        var options = url.parse(mapping.url);
        switch (options.protocol) {
            case 'http:':
                http.get(options, function (data) {
                    deliverDownload(res, mapping, data);
                });
                break;
            case 'file:':
                var data = fs.createReadStream(options.host + options.path);
                data.statusCode = 200;
                deliverDownload(res, mapping, data);
                break;
        }
    },
    'error': function (res, mapping) {
        res.writeHead(mapping.statusCode, {
            'Content-Type': 'text/html'
        });
        res.end(mapping.statusCode + ' ' + mapping.data);
    }
};
module.exports = actions;