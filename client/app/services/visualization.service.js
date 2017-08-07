(function() {
  'use strict';

  angular.module("nginlog.Services")
    .factory('visualizationService', visualizationService);

  function visualizationService($http, $q) {
    var endpoint = 'http://104.196.239.23/couchdb/requests/_design/requests/_view/';
    var RequestData = {};

    RequestData.fetch = function(view, querystring) {
      return $http.get(endpoint + view + '?' + querystring)
        .then(function(res) {
          return res.data;
        }).catch(function(res) {
          return [];
        });
    };

    return RequestData;
  };

})();
