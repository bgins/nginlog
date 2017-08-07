(function() {
  'use strict';

  angular.module("nginlog.Controllers")
    .controller('navigationController', ["$scope", "$location", "$mdSidenav", navigationController]);

  function navigationController($scope, $location, $mdSidenav) {
    $scope.toggleSidenav = function() {
      $mdSidenav('left').toggle();
    };

    $scope.navigate = function(url) {
      $location.path(url);
      $scope.toggleSidenav();
    };

  };
})();
