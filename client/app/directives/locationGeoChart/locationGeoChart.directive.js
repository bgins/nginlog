(function() {
  'use strict';

  angular.module("nginlog.Directives")
    .directive ('nginlogLocationGeoChart', nginlogLocationGeoChart);

  function nginlogLocationGeoChart () {
    return {
      restrict: "E",
      controller: locationGeoChartController,
      templateUrl: "directives/locationGeoChart/locationGeoChart.template.html"
    };
  };

  function locationGeoChartController($scope, visualizationService) {
    visualizationService.fetch('country_name_ip_pairs','group=true')
      .then(function(result) {
        var geoChart = {};
        var results = [['Country', 'Total', 'Unique']];  // first array is metadata

        // transform result from [{key: ["country_name", numIp], value: "count"}, ...]
        // to [[strCountry, intTotal, intUnique], ...]
        var country = "";
        var currIdx = 0;
        var currCountry = "";
        for (var i = 0; i < result.rows.length; i += 1) {
          var row = [];
          country = result.rows[i].key[0];
          if (country !== currCountry) {
            row.push(result.rows[i].key[0]);
            row.push(result.rows[i].value);
            row.push(1);
            currIdx += 1;
            currCountry = result.rows[i].key[0];
            results.push(row);
          } else {
            results[currIdx][1] += result.rows[i].value;
            results[currIdx][2] += 1;
          }
        }

        geoChart.type = "GeoChart";
        geoChart.data = results;

        geoChart.options = {
          colorAxis: {colors: ['#8990ac', '#09102c']},
          backgroundColor: '#fafafa',
          displayMode: 'regions'
        };

        $scope.chart = geoChart;
      });

  };
})();
