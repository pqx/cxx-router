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
router.match('/article/hello-world');

// name: 'article'
// params: {article: 'hello-world'}
// path: '/article/hello-world'
// fns: [article]
```

## Supported browsers
IE9+