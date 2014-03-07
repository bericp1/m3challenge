module.exports = ['$rootScope', '$scope', 'AuthUserService', 'SharingService', function ($rootScope, $scope, UserService, SharingService) {
  'use strict';

  $scope.state = {
    input: {
      text: '',
      url: '',
      image: ''
    },
    color: 'default',
    user: UserService.user
  };
  $scope.things = SharingService.things;

  $scope.share = function(type){
    var data = $scope.state.input[type];
    $scope.state.input[type] = '';
    SharingService.share({
      data: data,
      type: type,
      creator: UserService.user._id,
      color: $scope.state.color
    });
  };

  $scope.unshare = function(id){
    SharingService.unshare(id);
  };

  $scope.$watch(function(){return UserService.user;}, function(){
    $scope.state.user = UserService.user;
  }, true);
  $scope.$watch(function(){return SharingService.things;}, function(){
    $scope.things = SharingService.things;
  }, true);

  UserService.runAsUser(function(){
    SharingService.update();
  });

}];