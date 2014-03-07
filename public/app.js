require('./assets/js/util');
require('./sharing');
require('./auth');

(function(angular){
  'use strict';
  angular
    .module('m3legacy', ['compiled-templates', 'ngRoute', 'btford.socket-io', 'auth', 'sharing'])
    .directive('fileReader', require('./common/file-reader-directive'))
    .config(['socketProvider', '$routeProvider', function(socketProvider, $routeProvider){
      socketProvider.prefix('socket.');
          $routeProvider.otherwise({
              redirectTo: '/sharing'
          });
    }]);
})(angular);