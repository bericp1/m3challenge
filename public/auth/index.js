(function(angular){
  'use strict';

  angular.module('auth', ['ngRoute', 'ngCookies'])
    .service('AuthUserService', require('./user-service'))
    .controller('AuthController', require('./controller'))
    .controller('AuthLogoutController', require('./logout-controller'))
    .directive('authAccountBox', require('./account-box/directive'))
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/auth/logout', {
          template: '',
          controller: 'AuthLogoutController'
        })
        .when('/auth/:mode', {
          templateUrl: 'auth/index.tmpl',
          controller: 'AuthController'
        });
    }]);
})(angular);