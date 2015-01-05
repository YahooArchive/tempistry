tempistry
=======

[![Build Status](https://travis-ci.org/yahoo/tempistry.svg?branch=master)](https://travis-ci.org/yahoo/tempistry)

ultra light-weight registry for serializing javascript templates and applying pre/post render logic

## Install

```bash
npm install tempistry
```

Uses [temper](https://github.com/bigpipe/temper) for compilation, so supports the following rendering engines:

+ jade
+ ejs
+ hogan.js
+ mustache
+ handlebars

## Server Side

```javascript
var tempistry = require('tempistry');

var templateString = tempistry.serialize('/my/templates/file.jade');

// you can send this to the browser as a string and call the function
var clientJS = "var myTemplate = " + templateString;
```

You can also grab the full template [data object](https://github.com/bigpipe/temper#data-structure) that temper provides by passing true as the second param

```javascript
var data = tempistry.serialize('/my/templates/file.jade', true);
```

## Browserify Transform

If you're using Browserify, the easiest way to plug tempistry into your pipeline is via the included transform, `tempistry/transform`.  You can then require your template files directly and have them automatically registered with tempistry.


```bash
# Via cli
browserify -t tempistry/transform main.js
```

```javascript
// Via api
var b = browserify().transform('tempistry/transform');
```


```javascript
// register pre-render hook
var tempistry = require('tempistry');

tempistry.on('pre-render', function(data) {
	data.helpers = myViewHelpers;
});

var template = require('./things.jade');

// *helpers* will be available in the template due to the pre-render hook above
var html = template({
	name: 'Kellan'
});
```

## Client-Side

Tempistry runs in the browser w/ browserify and acts as a registry to hook pre/post render logic into.  This is useful for mixing in common view data such as formatting helpers.  It works well when combined with the server side `serialize()` function, but you can register any function you want with it.

```javascript
var tempistry = require('tempistry');

// register functions w/ the global tempistry lib, receive the template function back
var template = tempistry.register(function() { /** function string provided from server-side tempistry.serialize() call*/});

// mixin pre/post render logic
tempistry.on('pre-render', function(data) {
    // override "name"
    data.name = 'asher';
});

// wire in post-render logic, receiving the data that was rendered and the html string
tempistry.on('post-render', function(result) {
    console.log(result.data.name); // asher
    console.log(result.html); // html string returned from template fn
});

// call the template function
var html = template({
    name: 'kellan'
});

// name will be 'asher' in the html produced
```


## License
This software is free to use under the Yahoo! Inc. BSD license.
See the [LICENSE file][] for license text and copyright information.

[LICENSE file]: https://github.com/yahoo/tempistry/blob/master/LICENSE.md

Third-pary open source code used are listed in our [package.json file]( https://github.com/yahoo/tempistry/blob/master/package.json).
