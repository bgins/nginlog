(function() {
  'use strict';

  angular.module("nginlog.Controllers")
    .controller('chartController', ["$scope", "visualizationService", chartController]);

  function chartController($scope, visualizationService) {
    // get the raw data and process it
    // var rawData = {};

    // test call to service
    var data = visualizationService.fetch('','');

    $scope.chartConfig = {
      chart: {
        type: 'pie',
        backgroundColor: 'transparent'
      },
      series: [{
        data: data,
        id: 'series1'
      }],
      title: {
        text: null
      }
    };
  };
})();
