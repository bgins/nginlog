(function() {
  'use strict';

  angular.module("nginlog.Controllers")
    .controller('homeController', ["$rootScope", homeController]);

  function homeController($rootScope) {
    $rootScope.header = 'Home';
  };
})();
