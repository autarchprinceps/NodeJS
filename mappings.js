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
    },
    'T': {
        action: 'download',
        url: 'file://./T.jpg',
        fileName: 'T.jpg',
        contentType: 'Image/jpeg',
        forceDownload: false
    }
};
module.exports = mappings;