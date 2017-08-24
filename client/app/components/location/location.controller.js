(function() {
  'use strict';

  angular.module("nginlog.Controllers")
    .controller('locationController', ["$rootScope", locationController]);

  function locationController($rootScope) {
    $rootScope.header = "Location";
  };

})();
