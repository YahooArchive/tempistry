tempistry
=======

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

## Client-Side

Tempistry runs in the browser w/ browserify and acts as a registry to hook pre/post render logic into.  This is useful for mixing in common view data such as formatting helpers.  It works well when combined with the server side `serialize()` function, but you can register any function you want with it.

```javascript
var tempistry = require('tempistry');

// register functions w/ the global tempistry lib, receive the template function back
var template = tempistry.register(function() { /** function string provider from server-side tempistry.serialize() call*/});

// mixin pre/post render logic
tempistry.on('pre-render', function(data) {
    data.name = 'asher';
});

// wire in post-render logic, receiving the data that was rendered
tempistry.on('post-render', function(data) {
    console.log(data.name); // ahser
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
