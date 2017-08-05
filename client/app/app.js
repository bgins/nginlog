(function() {
  'use strict';

  angular.module('nginlog', ["ui.router", "ngMaterial", "highcharts-ng", "components.chart"])
    .config(function($urlRouterProvider, $mdThemingProvider) {
      $urlRouterProvider.otherwise('/');
      $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .dark();
    })
    .controller('AppCtrl', AppCtrl);

  function AppCtrl($scope, $mdSidenav) {
    $scope.toggleSidenav = function() {
      $mdSidenav('left').toggle();
    };
  };
})();
