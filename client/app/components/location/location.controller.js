(function() {
  'use strict';

  angular.module("nginlog.Controllers")
    .controller('locationController', ["$scope", "visualizationService", locationController]);

  function locationController($scope, visualizationService) {
    visualizationService.fetch('total_requests_by_country_name','group=true')
      .then(function(result) {
        $scope.rows = result.rows;
        $scope.rows.count = result.rows.length;
      });

    $scope.query = {
      order: 'key',
      limit: 5,
      page: 1
    };
  };

})();
