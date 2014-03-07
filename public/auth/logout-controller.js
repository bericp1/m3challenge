module.exports = ['AuthUserService', '$location', function(UserService, $location){
  UserService.logout(function(){
    var ret = $location.search()['return'];
    if(typeof ret === 'string'){
      $location.search('return', null).path(ret);
    }else{
      $location.path('/');
    }
  });
}];