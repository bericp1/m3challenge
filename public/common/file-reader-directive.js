module.exports = [function () {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      file: '=fileReader'
    },
    link: function ($scope, $element) {
      $element.bind("change", function(changeEv) {
        var file = new FileReader();
        file.onload = function (loadEv) {
          $scope.$apply(function () {
            $scope.file = loadEv.target.result;
          });
        };
        file.readAsDataURL(changeEv.target.files[0]);
      });
    }
  };
}];