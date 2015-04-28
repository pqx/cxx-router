var assert = require('assert');
var Router = require('./index');

describe('router', function() {
  it('matches string', function() {
    var router = new Router();
    router.on('hello', '/hello-world');
    assert.deepEqual(router.match('/hello-world'), {
      name: 'hello',
      path: '/hello-world',
      params: {},
      fns: []
    });
    assert.deepEqual(router.match('/hello-world/'), {
      name: 'hello',
      path: '/hello-world/',
      params: {},
      fns: []
    });
  });

  it('matches with one function', function() {
    var fn = function() {};
    var router = new Router();
    router.on('hello', '/hello-world', fn);
    assert.deepEqual(router.match('/hello-world'), {
      name: 'hello',
      path: '/hello-world',
      params: {},
      fns: [fn]
    });
  });

  it('matches with two functions', function() {
    var fn1 = function() {};
    var fn2 = function() {};
    var router = new Router();
    router.on('hello', '/hello-world', fn1, fn2);
    assert.deepEqual(router.match('/hello-world'), {
      name: 'hello',
      path: '/hello-world',
      params: {},
      fns: [fn1, fn2]
    });
  });

  it('matches with array of functions', function() {
    var fn1 = function() {};
    var fn2 = function() {};
    var router = new Router();
    router.on('hello', '/hello-world', [fn1, fn2]);
    assert.deepEqual(router.match('/hello-world'), {
      name: 'hello',
      path: '/hello-world',
      params: {},
      fns: [fn1, fn2]
    });
  });

  it('doesnot match', function() {
    var router = new Router();
    router.on('hello', '/hello-world');
    assert.deepEqual(router.match('/hello_world'), {});
  });

  it('matches one param', function() {
    var router = new Router();
    router.on('article', '/article/:article');
    assert.deepEqual(router.match('/article/hello-world'), {
      name: 'article',
      path: '/article/hello-world',
      params: {article: 'hello-world'},
      fns: []
    });
  });

  it('matches two params', function() {
    var router = new Router();
    router.on('section', '/section/:section');
    router.on('article', '/section/:section/article/:article');
    assert.deepEqual(router.match('/section/sports'), {
      name: 'section',
      path: '/section/sports',
      params: {
        section: 'sports'
      },
      fns: []
    });
    assert.deepEqual(router.match('/section/sports/article/hello-world'), {
      name: 'article',
      path: '/section/sports/article/hello-world',
      params: {
        section: 'sports',
        article: 'hello-world'
      },
      fns: []
    });
  });
});