/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var extend = require('deap').extendShallow,
    EventEmitter = require('events').EventEmitter;

// Clientside tempistry lib
var tempistry = module.exports = extend({

    register: function(template) {

        // return scoped template fn to hook in events
        return function(data) {
            data = data || {};
            tempistry.emit('pre-render', data);

            var result = {
                html: template(data),
                data: data
            };

            // emit result object w/ html & data to provide a hook to manipulate html if desired
            tempistry.emit('post-render', result);

            return result.html;
        };
    }

}, EventEmitter.prototype);
