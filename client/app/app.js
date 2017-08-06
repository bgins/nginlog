(function() {
  'use strict';

  angular.module("Common", ["ngRoute", "ngMaterial", "highcharts-ng"]);
  angular.module("nginlog.Services", []);
  angular.module("nginlog.Controllers", ["Common", "nginlog.Services"]);

  var app = angular.module("nginlog", [
    "nginlog.Controllers"
  ]);

  window.app = app;

  app.config(function($mdThemingProvider) {
          $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .dark();
  });
})();
