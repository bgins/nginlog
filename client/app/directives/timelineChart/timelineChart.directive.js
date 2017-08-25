(function() {
  'use strict';

  angular.module("nginlog.Directives")
    .directive ('nginlogTimelineChart', nginlogTimelineChart);

  function nginlogTimelineChart () {
    return {
      restrict: "E",
      controller: timelineChart,
      templateUrl: "directives/timelineChart/timelineChart.template.html"
    };
  };

  function timelineChart($scope, visualizationService) {
    var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var startToday = new Date().setHours(0,0,0,0);
    var sixDaysAgo = startToday - 518400000;

    visualizationService.fetch('timestamp', 'startkey="' + sixDaysAgo +'"')
      .then(function(result) {
        var labels = [];
        var data = [];

        var day = sixDaysAgo;
        var nextDay = 0;
        var count = 0;
        var currRow = 0;
        var timestamp = 0;  // 0 to catch no recent requests

        // count the requests per day for last week up to now
        for (var i = 0; i < 7; i += 1) {
          labels.push(weekdays[new Date(day).getDay()]);
          count = 0;
          nextDay = day + 86400000;
          while (timestamp * 1000 < nextDay && currRow < result.rows.length) {
            timestamp = parseFloat(result.rows[currRow].key);
            currRow += 1;
            count += 1;
          }
          data.push(count);
          day = nextDay;
        }

        $scope.labels = labels;
        $scope.data = data;
      });

  };
})();
