(function () {
  'use strict';

  angular.module('nginlog').config([
    "$routeProvider",
    "$locationProvider",
    function($routeProvider, $locationProvider) {

      $locationProvider.html5Mode(true);

      $routeProvider
        .when("/", {
          templateUrl: "components/home/home.template.html",
          controller: "homeController"
        })
        // .when("/map", {
        //   templateUrl: "components/map/map.template.html",
        //   controller: "mapController"
        // })
        // .when("/chart", {
        //   templateUrl: "components/chart/chart.template.html",
        //   controller: "chartController"
        // })
        .when("/location", {
          templateUrl: "components/location/location.template.html",
          controller: "locationController"
        })
        .when("/request", {
          templateUrl: "components/request/request.template.html"
        })
        .when("/404", {
          templateUrl: "components/errors/404.template.html"
        })
        .otherwise({
          redirectTo: "/404"
        });
    }
  ]);
})();
