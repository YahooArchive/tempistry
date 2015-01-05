/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var through = require('through'),
    tempistry = require('./index'),
    EXT_TEST = new RegExp('\\.('+tempistry.extensions().join('|')+')$');

// stream that transforms template files into compiled templates registered w/ tempistry
module.exports = function transformer(file, options) {
    if (!EXT_TEST.test(file)) {
        return through();
    }

    var buffer = '',
        stream = through(
            function(str) {
                buffer += str;
            },
            function() {
                this.queue(transform(buffer, file, options));
                this.queue(null);
            }
        );

    return stream;
};

// returns js string with compiled template registered w/ tempistry
function transform(str, file, options) {
    return [
        'module.exports = require("tempistry").register(', tempistry.serializeSource(str, file), ');'
    ].join('');
}
