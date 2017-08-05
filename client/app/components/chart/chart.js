(function() {
  'use strict';

  angular.module('components.chart', [])
    .controller('ChartController', ChartController);

  function ChartController($scope) {
    $scope.chartConfig = {
      chart: {
        type: 'pie',
        backgroundColor: 'transparent'
      },
      series: [{
        data: [10, 15, 12, 8, 7],
        id: 'series1'
      }],
      title: {
        text: null
      }
    };
  };
})();
