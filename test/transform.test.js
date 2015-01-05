var assert = require('chai').assert,
    fs = require('fs'),
    path = require('path'),
    transform = require('../transform');

describe('tempistry transform', function() {
    var ROOT = path.join(__dirname, 'fixtures'),
        templateFile = path.join(ROOT, 'bai.jade'),
        transformRegex = /^module\.exports = require\(\"tempistry\"\)\.register/;

    it('should be a function', function() {
        assert.isFunction(transform);
    });

    it('should return a duplex stream', function() {
        var stream = transform(path.join(ROOT, 'bai.jade'));

        assert.isObject(stream);
        assert.isTrue(stream.writable);
        assert.isTrue(stream.readable);
        assert.isFunction(stream.write);
        assert.isFunction(stream.push);
        assert.isFunction(stream.queue);
        assert.isFunction(stream.end);
        assert.isFunction(stream.destroy);
        assert.isFunction(stream.pause);
        assert.isFunction(stream.resume);
    });

    it('should transform a jade file', function(done) {
        var asserted = false,
            stream = transform(templateFile);

        stream
            .on('data', function(src) {
                assert.match(src, transformRegex);
                asserted = true;
            })
            .on('end', function() {
                assert.isTrue(asserted);
                done();
            });

        fs.createReadStream(templateFile, { encoding: 'utf8' })
            .pipe(stream);
    });

    it('should not transform a non-template file', function(done){
        var asserted = false,
            notTemplateFile = path.join(ROOT, 'not-a-template.js'),
            notTemplateSource = require(notTemplateFile),
            notTemplateRegex = /^module\.exports = 'notatemplate';/,
            stream = transform(notTemplateFile);

        stream
            .on('data', function(src) {
                assert.notMatch(src, transformRegex);
                assert.match(src, notTemplateRegex);
                asserted = true;
            })
            .on('end', function() {
                assert.isTrue(asserted);
                done();
            });

        fs.createReadStream(notTemplateFile, { encoding: 'utf8' })
            .pipe(stream);
    });

});
