# cxx-router [![Build Status](https://travis-ci.org/pqx/cxx-router.svg)](https://travis-ci.org/pqx/cxx-router)
Lightweight router module for node and browser
## Installation
``` sh
npm install cxx-router --save
```
## Usage
``` javascript
var Router = require('cxx-router');
var router = new Router();
function article() {}

router.on('article', '/article/:article', article);
router.match('/article/hello-world?page=1');

// name: 'article'
// params: {article: 'hello-world'}
// path: '/article/hello-world'
// fns: [article]
// qs: 'page=1'

var href = router.href('article', {article: 'hello-world'}, 'page=1');
// href: '/article/hello-world?page=1'
```

## Supported browsers
IE9+
