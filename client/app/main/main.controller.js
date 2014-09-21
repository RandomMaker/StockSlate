'use strict';

angular.module('stockSlateApp')
  .controller('MainCtrl', function ($scope, $http, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.investorProfile = '';
    $scope.getInclude = function() {
      return 'components/' + $scope.investorProfile + '.html';
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

    $scope.addNewList = function() {
      if ($scope.newListName === '') return;
      $scope.myStockLists.push({name: $scope.newListName, stocks: []});
      $scope.newListName = '';
    };

    $scope.myCustomProfiles = [{
      name: 'Custom Value Profile'
    }, {
      name: 'Custom Growth Profile'
    }];

    $http.get('/api/stocks').success(function(stocks){
      $scope.allStocks = stocks;
    });
  });
// {{res | filter:val}}
