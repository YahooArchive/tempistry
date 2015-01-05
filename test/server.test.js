/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var fs = require('fs'),
    assert = require('chai').assert,
    tempistry = require('../index');

describe('tempistry', function() {

    it('should be defined correctly', function() {
        assert.isFunction(tempistry.serialize);
    });

    it('tempistry.serialize defaults', function () {
        var template = tempistry.serialize(__dirname+'/fixtures/bai.jade');

        assert.isString(template);
        assert.match(template, (/<h1>bai/));

    });

    it('tempistry.serialize returnData', function () {
        var template = tempistry.serialize(__dirname+'/fixtures/bai.jade', true);

        assert.isObject(template);
        assert.isString(template.engine);
        assert.isString(template.library);
        assert.isString(template.client);
        assert.isFunction(template.server);
        assert.match(template.client, (/<h1>bai/));
        assert.equal(template.server({name:'Kellan'}), '<h1>bai Kellan</h1>');

    });

    it('tempistry.serializeSource defaults', function () {
        var filename = __dirname+'/fixtures/bai.jade',
            template = tempistry.serializeSource(fs.readFileSync(filename, 'utf8'), filename);

        assert.isString(template);
        assert.match(template, (/<h1>bai/));

    });


    it('tempistry.serializeSource returnData', function () {
        var filename = __dirname+'/fixtures/bai.jade',
            template = tempistry.serializeSource(fs.readFileSync(filename, 'utf8'), filename, true);

        assert.isObject(template);
        assert.isString(template.engine);
        assert.isString(template.library);
        assert.isString(template.client);
        assert.isFunction(template.server);
        assert.match(template.client, (/<h1>bai/));
        assert.equal(template.server({name:'Kellan'}), '<h1>bai Kellan</h1>');

    });

});
