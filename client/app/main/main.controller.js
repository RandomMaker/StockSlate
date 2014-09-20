'use strict';

angular.module('stockSlateApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $scope.loadThings = function() {
      $http.get('/api/things').success(function(awesomeThings) {
        $scope.awesomeThings = awesomeThings;
      });
    };

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing }).success(function(){
        $scope.loadThings();
      });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id).success(function(){
        $scope.loadThings();
      });
    };
  });
