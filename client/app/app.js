(function() {
  'use strict';

  angular.module("Common", ["ngRoute", "ngMaterial", "googlechart", "chart.js", "md.data.table"]);
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
    $mdThemingProvider.definePalette('nginlog-blue', {
      '50': 'bcc3df',
      '100': 'a2a9c5',
      '200': '8990ac',
      '300': '6f7692',
      '400': '565d79',
      '500': '49506C',
      '600': '3c435f',
      '700': '232a46',
      '800': '09102c',
      '900': '000013',
      'A100': 'ada2c6',
      'A200': '9489ad',
      'A400': '54496d',
      'A700': '2e2347',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100']
    });

    $mdThemingProvider.theme('default')
      .primaryPalette('nginlog-blue', {
        default: '500'
      });
  });
})();
