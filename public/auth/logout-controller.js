module.exports = ['AuthUserService', '$location', function(UserService, $location){
  'use strict';
  UserService.logout(function(){
    var ret = $location.search()['return'];
    if(typeof ret === 'string'){
      $location.search('return', null).path(ret);
    }else{
      $location.path('/');
    }
  });
}];