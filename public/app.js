require('./assets/js/util');
require('./sharing');
require('./auth');

(function(angular){
  'use strict';
  angular
    .module('m3legacy', ['compiled-templates', 'ngRoute', 'btford.socket-io', 'auth', 'sharing'])
    .directive('fileReader', require('./common/file-reader-directive'))
    .factory('sharingSocket', function (socketFactory) {
      return socketFactory();
    })
    .config(['$routeProvider', function($routeProvider){
      $routeProvider.otherwise({
        redirectTo: '/sharing'
      });
    }]);
})(angular);