var fs = require('fs'),
  path = require('path'),
  express = require('express');

var rroute = function (dir, io) {
  var app = express();
  fs.readdirSync(dir)
    .forEach(function(rel){
      var abs = path.join(dir, rel);
      var stats = fs.statSync(abs);
      if(stats.isDirectory()){
        app.use('/'+rel,rroute(abs, io));
      }else if(rel.indexOf('.js') === (rel.length - 3)){
        var clean = rel.substr(0,rel.length-3);
        if(clean === 'index'){
          clean = '/';
        }else{
          clean = '/'+clean+'/';
        }
        app.use(clean, require(abs)(io));
      }
    });
  return app;
};

module.exports = rroute;