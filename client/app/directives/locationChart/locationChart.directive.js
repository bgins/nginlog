(function() {
  'use strict';

  angular.module("nginlog.Directives")
    .directive ('nginlogLocationChart', nginlogLocationChart);

  function nginlogLocationChart () {
    return {
      restrict: "E",
      controller: locationChartController,
      templateUrl: "directives/locationChart/locationChart.template.html"
    };
  };

  function locationChartController($scope, visualizationService) {
    visualizationService.fetch('total_requests_by_country_name','group=true')
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
        $scope.options = {legend:
                          { display: false,
                            position: 'bottom'
                          }
                         };
      });
  };


// function pieChartController($scope, visualizationService) {
//     visualizationService.fetch('country_name_ip_pairs','group=true')
//       .then(function(result) {
//         var results = {};
//         var labels = [];
//         var data = [];
//         var totalData = [];
//         var uniqueData = [];

//         // transform result from [{key: ["country_name", numIp], value: "count"}, ...]
//         // to [{"country_name": [numTotal, numUnique]}, ...]
//         var label = "";
//         var currLabel = "";
//         for (var i = 0; i < result.rows.length; i += 1) {
//           label = result.rows[i].key[0];
//           if (label !== currLabel) {
//             results[result.rows[i].key[0]] = [result.rows[i].value, 1];
//             currLabel = label;
//           } else {
//             results[currLabel] = [results[currLabel][0] + result.rows[i].value, results[currLabel][1] + 1];
//           }
//         }

//         // get keys sorted by value descending
//         var keys = Object.keys(results).sort(function(a,b) { return results[b][0] - results[a][0]; });

//         for (var j = 0; j < keys.length; j += 1) {
//           if (j < 6) {
//             labels.push(keys[j]);
//             totalData.push(results[keys[j]][0]);
//             uniqueData.push(results[keys[j]][1]);
//           } else {
//             if (j === 6) {
//               labels.push('Other');
//               totalData.push(0);
//               uniqueData.push(0);
//             }
//             totalData[6] += results[keys[j]][0];
//             uniqueData[6] += results[keys[j]][1];
//           }
//         }

//         $scope.labels = labels;
//         $scope.data = [totalData, uniqueData];
//         $scope.series = ['Total', 'Unique'];
//         $scope.options = {legend:
//                           { display: true,
//                             position: 'bottom'
//                           }
//                          };
//       });
//   };

})();
