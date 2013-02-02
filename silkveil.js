var http = require('http');
var url = require('url');

var mappings = {
    'goloroden': {
        action: 'redirect',
        url: 'http://www.goloroden.de',
        type: 'permanent'
    },
    'polarbear': {
        action: 'download',
        url: 'http://www.goloroden.de/images/Logo.png',
        fileName: 'PolarBear.png',
        contentType: 'Image/png',
        forceDownload: false
    }
};
var actions = {
    'redirect': function (res, mapping) {
        var statusCode = mapping.type === 'permanent' ? 301 : 307;
        res.writeHead(statusCode, {
            'Location': mapping.url
        });
        res.end();
    },
    'download': function (res, mapping) {
        http.get(url.parse(mapping.url), function (data) {
            var contentDisposition = mapping.forceDownload ?
                'attachment' : 'inline';
            res.writeHead(data.statusCode, {
                'Content-Type': mapping.contentType,
                'Content-Disposition': contentDisposition +
                    '; filename=' + mapping.fileName + ';'
            });
            data.pipe(res);
        });
    },
    'error': function (res, mapping) {
        res.writeHead(mapping.statusCode, {
            'Content-Type': 'text/html'
        });
        res.end(mapping.statusCode + ' ' + mapping.data);
    }
};

http.createServer(function (req, res) {
    var alias = req.url.substring(1);
    var mapping = mappings[alias] || {
        action: 'error',
        statusCode: 404,
        data: 'File not found'
    };
    actions[mapping.action](res, mapping);
}).listen(3000);