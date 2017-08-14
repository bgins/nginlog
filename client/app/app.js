(function() {
  'use strict';

  angular.module("Common", ["ngRoute", "ngMaterial", "chart.js"]);
  angular.module("nginlog.Services", []);
  angular.module("nginlog.Controllers", ["Common", "nginlog.Services"]);
  angular.module("nginlog.Directives", ["Common", "nginlog.Services"]);

  var app = angular.module("nginlog", [
    "nginlog.Controllers",
    "nginlog.Directives",
    "nginlog.Services"
  ]);

  window.app = app;

  app.config(function($mdThemingProvider) {
          $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .dark();
  });
})();
