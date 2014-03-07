module.exports = function(io){
  var express = require('express'),
    mongoose      = require('mongoose'),
    authenticate = require('../lib/auth/authenticate'),
    Thing = mongoose.model('Thing'),
    app = express();

  app.get('/',
    authenticate(),
    function(req, res){
      Thing.find({}, function(err, things){
        if(err){
          console.error('There was a serious error accessing the database:', err);
          return res.send(500, {error:'There was a database error.'});
        }else{
          Thing.populate(things, 'creator', function(err, things){
            if(err) {
              console.error('There was a serious error accessing the database:', err);
              return res.send(500, {error: 'There was a database error.'});
            }else{
              return res.send({
                status: 'ok',
                things: things
              });
            }
          });
        }
      });
    }
  );

  app.post('/',
    authenticate(),
    function(req, res){
      var thing = req.body.thing;
      var required = ['data', 'type', 'creator', 'color'];
      var missing = [];
      if( typeof thing !== 'object' ){
        missing = required;
      } else {
        required.forEach(function(field){
          if(!thing.hasOwnProperty(field)) missing.push(field);
        });
      }
      if(missing.length>0){
        return res.send(400, {
          status: 'error',
          error: 'Missing required fields.',
          fields: missing
        });
      }else{
        var newThing = new Thing(thing);
        return newThing.save(function(err, thing){
          if(err){
            console.error('There was a serious error accessing the database:', err);
            res.send(500, {error:'There was a database error.'});
          }else{
            thing.populate('creator', function(err, thing){
              if(err) {
                console.error('There was a serious error accessing the database:', err);
                return res.send(500, {error: 'There was a database error.'});
              }else{
                res.send({
                  status: 'ok',
                  thing: thing
                });
                io.sockets.emit('update');
              }
            });
          }
        });
      }
    }
  );

  app['delete']('/',
    authenticate(),
    function(req, res){
      Thing.findById(req.query.id, function(err, thing){
        if(err){
          console.error('There was a serious error accessing the database:', err);
          res.send(500, {error:'There was a database error.'});
        }else{
          if(thing.creator.toString() !== req.user._id.toString()){
            res.send(401, {error: 'Authenticated used does not own this Thing.'});
          }else{
            thing.remove(function(err){
              if(err){
                console.error('There was a serious error accessing the database:', err);
                res.send(500, {error:'There was a database error.'});
              }else{
                res.send({status: 'ok', deleted:req.query.id});
                io.sockets.emit('update');
              }
            });
          }
        }
      });
    }
  );

  return app;
};