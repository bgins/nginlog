(function() {
  'use strict';

  angular.module("nginlog.Directives")
    .directive ('nginlogLocationDataTable', nginlogLocationDataTable);

  function nginlogLocationDataTable () {
    return {
      restrict: "E",
      controller: locationDataTable,
      templateUrl: "directives/locationDataTable/locationDataTable.template.html"
    };
  };

  function locationDataTable($scope, visualizationService) {
    visualizationService.fetch('country_name_ip_pairs','group=true')
      .then(function(result) {
        var results = [];

        // transform result from [{key: ["country_name", numIp], value: "count"}, ...]
        // to [{"country": strCountry, "total": intTotal, "unique": intUnique}, ...]
        var country = "";
        var currIdx = -1;
        var currCountry = "";
        for (var i = 0; i < result.rows.length; i += 1) {
          country = result.rows[i].key[0];
          if (country !== currCountry) {
            results.push({"country": result.rows[i].key[0], "total": result.rows[i].value, "unique": 1});
            currIdx += 1;
            currCountry = result.rows[i].key[0];
          } else {
            results[currIdx].total += result.rows[i].value;
            results[currIdx].unique += 1;
          }
        }
        $scope.rows = results;
        $scope.rows.count = results.length;
      });

    $scope.query = {
      order: 'key',
      limit: 10,
      page: 1
    };
  };
})();
