/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
 var Temper = require('temper'),
    temper = new Temper({ cache: false });

// Server-side serialization
// returns client-side string by default, entire data object if returnData == true
exports.serialize = function(filename, returnData) {
    var data = temper.fetch(filename);

    return !!returnData ? data : data.client;
};

// Same as serialize(), but compile from source
// useful if you have the source already, this prevents redundant file reading
exports.serializeSource = function(source, filename, returnData) {
    var data = temper.compile(source, temper.discover(filename), 'anonymous', filename);

    return !!returnData ? data : data.client;
};
