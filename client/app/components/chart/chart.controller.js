(function() {
  'use strict';

  angular.module("nginlog.Controllers")
    .controller('chartController', chartController);

  function chartController($scope) {
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
