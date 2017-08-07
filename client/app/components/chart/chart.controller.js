(function() {
  'use strict';

  angular.module("nginlog.Controllers")
    .controller('chartController', ["$scope", "visualizationService", chartController]);

  function chartController($scope, visualizationService) {
    // get the raw data and process it
    $scope.chartConfig = {};

    // test call to service
    // data = visualizationService.fetch('total_requests_by_country_name','group=true');

    visualizationService.fetch('total_requests_by_country_name','group=true')
      .then(function(result) {
        var data = [];

        // get data from result
        for (var i = 0; i < result.rows.length; i += 1) {
          data.push({ name: result.rows[i].key, y: result.rows[i].value });
        }

        // setup chart
        $scope.chartConfig = {
          chart: {
            type: 'pie',
            backgroundColor: 'transparent'
          },
          yAxis: {
            title: {
              text: ''
            }
          },
          xAxis: {
            lineColor: 'transparent'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false
              },
              showInLegend: true
            }
          },
          series: [{
            data: data,
            id: 'series1'
          }],
          title: {
            text: 'Requests by country'
          }
        };
      });



    // $scope.chartConfig = {
    //   chart: {
    //     type: 'pie',
    //     backgroundColor: 'transparent'
    //   },
    //   series: [{
    //     data: [1],
    //     id: 'series1'
    //   }],
    //   title: {
    //     text: null
    //   }
    // };
  };
})();
