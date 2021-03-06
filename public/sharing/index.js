(function(angular){
  'use strict';

  angular.module('sharing', ['ngRoute'])
    .service('SharingService', require('./service'))
    .controller('SharingController', require('./controller'))
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/sharing', {
          templateUrl: 'sharing/main.tmpl',
          controller: 'SharingController'
        });
    }]);
})(angular);