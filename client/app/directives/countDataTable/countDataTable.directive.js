(function() {
  'use strict';

  angular.module("nginlog.Directives")
    .directive ('nginlogCountDataTable', nginlogCountDataTable);

  function nginlogCountDataTable () {
    return {
      restrict: "E",
      controller: countDataTable,
      scope: {
        key: '='
      },
      templateUrl: "directives/countDataTable/countDataTable.template.html"
    };
  };

  function countDataTable($scope, visualizationService) {
    visualizationService.fetch('requests_for_' + $scope.key, 'group=true')
      .then(function(result) {
        var results = [];

        // transform result from [{key: [strKey, numIp], value: intCount}, ...]
        // to [{"country": strCountry, "total": intTotal, "unique": intUnique}, ...]
        var key = "";
        var currIdx = -1;
        var currKey = "";
        for (var i = 0; i < result.rows.length; i += 1) {
          key = result.rows[i].key[0];
          if (key !== currKey) {
            results.push({"key": result.rows[i].key[0], "total": result.rows[i].value, "unique": 1});
            currIdx += 1;
            currKey = result.rows[i].key[0];
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
