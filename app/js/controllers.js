'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('CalendarCtrl', ['$scope', '$http', function($scope, $http) {
  	$http({
  		method: 'GET',
  		url: 'data/events.json'
  	}).success(function(data, status, headers, config) {
  		$scope.events = data;
  	});
  	$scope.title = 'Calendar app';

  }])
  .controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }]);