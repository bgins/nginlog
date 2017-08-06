(function() {
  'use strict';

  angular.module("nginlog.Services")
    .factory('visualizationService', visualizationService);

  function visualizationService($http, $q) {
    var endpoint = '';
    var RequestData = {};

    RequestData.fetch = function(view, querystring) {
      // test data
      return [8, 15, 15, 2, 7, 12, 1];

      // return $http.get(endpoint + view + '?' + querystring)
      //   .then(function(res) {
      //     // process data
      //     return res.data;
      //   }).catch(function(res) {
      //     // some error case
      //     return [];
      //   });
    };

    return RequestData;
  };

})();
