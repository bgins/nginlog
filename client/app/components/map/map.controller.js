(function() {
  'use strict';

  angular.module("nginlog.Controllers")
    .controller('mapController', mapController);

  function mapController($scope) {
    $scope.mapConfig = {
      chart: {
        borderWidth: 1,
        type: 'map',
        map: 'custom/world',
        backgroundColor: 'transparent'
      },

      title: {
        text: 'World population 2013 by country'
      },

      subtitle: {
        text: 'Demo of Highcharts map with bubbles'
      },

      legend: {
        enabled: false
      },

      mapNavigation: {
        enabled: false
        // enabled: true,
        // buttonOptions: {
        //   verticalAlign: 'bottom'
        // }
      },

      series: [{
        name: 'Countries',
        color: '#E0E0E0',
        enableMouseTracking: false
      }, {
        type: 'mapbubble',
        name: 'Population 2013',
        joinBy: ['iso-a2', 'code'],
        data: [ { code: "AF", z: 30552 }, { code: "AL", z: 2897 } ],
        minSize: 4,
        maxSize: '12%',
        tooltip: {
          pointFormat: '{point.code}: {point.z} thousands'
        }
      }]
    };
  };
})();
