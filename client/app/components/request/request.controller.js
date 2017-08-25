(function() {
  'use strict';

  angular.module("nginlog.Controllers")
    .controller('requestController', ["$rootScope", requestController]);

  function requestController($rootScope) {
    $rootScope.header = "Request";
  };
})();
