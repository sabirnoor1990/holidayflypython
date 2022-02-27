/*
 * Title:   Travelo - Travel, Tour Booking HTML5 Template - Custom Javascript file
 * Author:  http://themeforest.net/user/soaptheme
 */
var app = angular.module('AppHolidayfly', []);
app.controller('holidayflyCtrl', function($scope, $http) {
  $http.get("flightdata")
  .then(function(response) {
      $scope.myWelcome = response.data;
  });
});
tjq(document).ready(function() {
    // UI Form Element
});