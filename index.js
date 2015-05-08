var Router = function() {
  this._routes = {};
  this.routes = [];
};

var proto = Router.prototype;

proto.on = function(name, pattern) {
  var route = {};
  var fns = arguments.length > 3 ?
    Array.prototype.slice.call(arguments, 2) :
    (typeof arguments[2] === 'function' ? [arguments[2]] : arguments[2]);

  route.name = name;
  route.pattern = pattern;
  route.fns = fns || [];

  var names = [];
  var regx = pattern.replace(/:\w+/g, function(p) {
    names.push(p.substr(1));
    return '([a-z0-9A-Z\-_]+)';
  });

  route.regx = new RegExp('^'+regx+'\/?$');
  route.names = names;

  this._routes[name] = route;
  this.routes.push(route);
};

proto.match = function(path) {
  var routes = this.routes;
  var params = {};

  var ps = path.split('?');
  path = ps[0];
  var qs = ps[1] || null;

  for(var i = 0, j = routes.length; i < j; i++) {
    var route = routes[i];
    var names = route.names;
    var matches = path.match(route.regx);

    if(matches) {
      names.forEach(function(name, i) {
        params[name] = matches[i+1];
      });

      return {
        name: route.name,
        path: path,
        params: params,
        fns: route.fns,
        qs: qs
      };
    }
  }

  return {};
};

proto.href = function(name, params, qs) {
  var route = this._routes[name];
  var names = route.names;
  var pattern = route.pattern;

  var path = pattern.replace(/:\w+/g, function(p) {
    return params[p.substr(1)] || '';
  });

  if(qs) return path + '?' + qs;
  return path;
};

module.exports = Router;