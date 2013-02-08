var url = require('url');

var redirect = function (domain) {
    return function (req, res) {
        var hostHeader = req.headers.host || '';
        if (hostHeader.indexOf('localhost') === 0 || hostHeader.indexOf(domain) === 0) {
            return;
        }
        var options = url.parse(req.url);
        options.host = domain;
        res.writeHead(301, {
            'Location': url.format(options)
        });
        res.end();
    };
};

module.exports = redirect;