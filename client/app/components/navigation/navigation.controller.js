(function() {
  'use strict';

  angular.module("nginlog.Controllers")
    .controller('navigationController', navigationController);

  function navigationController($scope, $mdSidenav) {
    $scope.toggleSidenav = function() {
      $mdSidenav('left').toggle();
    };
  };
})();
