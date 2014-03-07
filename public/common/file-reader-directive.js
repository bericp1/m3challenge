module.exports = [function () {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      file: '=fileReader'
    },
    link: function ($scope, $element) {
      if($element.parents('form').length <= 0){
        $element.wrap('<form></form>');
      }
      $element.bind('change', function(changeEv) {
        var file = new FileReader();
        file.onload = function (loadEv) {
          $scope.$apply(function () {
            $scope.file = loadEv.target.result;
          });
        };
        file.readAsDataURL(changeEv.target.files[0]);
      });
      $scope.$watch('file', function(){
        if($scope.file === ''){
          $element.parent().get(0).reset();
        }
      }, true);
    }
  };
}];