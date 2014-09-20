'use strict';

angular.module('stockSlateApp')
  .controller('MainCtrl', function ($scope, $http, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.myStockLists = [{
      name: 'Technology Stocks',
      stocks: []
    }, {
      name: 'Restaurant Stocks',
      stocks: []
    }, {
      name: 'Pot Stocks',
      stocks: []
    }, {
      name: 'Telecom Stocks',
      stocks: []
    }];

    $scope.myCustomProfiles = [{
      name: 'Value Profile'
    }, {
      name: 'Growth Profile'
    }]
  });
