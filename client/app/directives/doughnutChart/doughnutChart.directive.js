(function() {
  'use strict';

  angular.module("nginlog.Directives")
    .directive ('nginlogDoughnutChart', nginlogDoughnutChart);

  function nginlogDoughnutChart () {
    return {
      restrict: "E",
      scope: {
        field: '=',
        title: '='
      },
      controller: doughnutChartController,
      templateUrl: "directives/doughnutChart/doughnutChart.template.html"
    };
  };

  function doughnutChartController($scope, visualizationService) {
    console.log($scope.title);
    visualizationService.fetch('total_requests_by_' + $scope.field,'group=true')
      .then(function(result) {
        var results = {};
        var labels = [];
        var data = [];

        // flatten array of objects into a single object
        for (var i = 0; i < result.rows.length; i += 1) {
          results[result.rows[i].key] = result.rows[i].value;
        }

        // get keys sorted by value descending
        var keys = Object.keys(results).sort(function(a,b) { return results[b] - results[a]; });


        // push results into labels and data arrays for chart.js
        // the sum of results beyond the first six are put in an 'Other' category
        for (var j = 0; j < keys.length; j += 1) {
          if (j < 6) {
            labels.push(keys[j]);
            data.push(results[keys[j]]);
          } else {
            if (j === 6) {
              labels.push('Other');
              data.push(0);
            }
            data[6] += results[keys[j]];
          }
        }

        $scope.labels = labels;
        $scope.data = data;
        $scope.options = {};
        $scope.options =
          // {legend:
          //                 { display: true,
          //                   position: 'bottom'
          //                 },
          { title:
            { display: true,
              text: $scope.title
            }
          };
      });
  };
})();
