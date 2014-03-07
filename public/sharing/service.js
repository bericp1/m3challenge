/*global alert*/
module.exports = ['$rootScope', '$http', 'AuthUserService', 'sharingSocket', function ($rootScope, $http, UserService, socket) {
  'use strict';

  var me = this;

  me.things = [];
  me.processing = false;

  me.update = function(){
    console.log('updating...');
    if(UserService.user !== false && me.processing === false){
      me.processing = true;
      return $http
        .get('/sharing/?token=' + UserService.token)
        .success(function(data){
          me.things = data.things;
        })
        .error(function(data){
          console.error('Problem updating:', data);
          alert('There was a problem getting the content:\n' + data.error); //TODO More elegant way of notifying the user
        })
        .finally(function(){
          me.processing = false;
        });
    }
  };

  me.share = function(){
    if(UserService.user !== false && me.processing === false){
      var thing = {};
      switch (arguments.length){
      case 0:
        return;
      case 1:
        thing = arguments[0];
        break;
      case 2:
        thing = {
          data: arguments[0],
          type: arguments[1],
          creator: UserService.user._id,
          color: 'default'
        };
        break;
      case 3:
        thing = {
          data: arguments[0],
          type: arguments[1],
          creator: arguments[2],
          color: 'default'
        };
        break;
      default:
        thing = {
          data: arguments[0],
          type: arguments[1],
          creator: arguments[2],
          color: arguments[3]
        };
        break;
      }
      me.processing = true;
      return $http
        .post('/sharing/', {
          token: UserService.token,
          thing: thing
        })
        .success(function(data){
          me.things.push(data.thing);
        })
        .error(function(data){
          console.error(data);
          alert('There was an issue sharing this content.\n' + data.error);//TODO More majestic notification of user
        })
        .finally(function(){
          me.processing = false;
        });
    }
  };

  me.unshare = function(id){
    if(UserService.user !== false && me.processing === false && typeof id === 'string') {
      me.processing = true;
      return $http['delete']('/sharing/?token=' + UserService.token + '&id=' + id)
        .error(function(data){
          console.error(data);
          alert('There was an issue deleting some content.\n' + data.error);
        })
        .success(function(){
          for(var i=0; i<me.things.length; i++){
            var thing = me.things[i];
            if(thing._id === id){
              me.things.splice(i, 1);
              break;
            }
          }
        })
        .finally(function(){
          me.processing = false;
        });
    }
  };

  socket.on('update', function(){
    me.update();
  });
}];