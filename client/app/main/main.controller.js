'use strict';

angular.module('stockSlateApp')
  .controller('MainCtrl', function ($scope, $http, Auth, $rootScope) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.investorProfile = '';

    $scope.getInclude = function() {
      return 'components/' + $scope.investorProfile + '.html';
    };

    $scope.watchlistIndex = 0;

    $scope.setWatchlistIndex = function(index) {
      $scope.watchlistIndex = index;
      $scope.investorProfile = '';
    };

    $rootScope.myStockLists = [{
      name: 'Technology Stocks',
      stocks: [{
        name: 'Apple Inc.',
        symbol: 'AAPL'
      }, {
        name: 'IBM',
        symbol: 'IBM'
      }]
    }, {
      name: 'Restaurant Stocks',
      stocks: [{
        name: "McDonald's",
        symbol: "MCD"
      }]
    }, {
      name: 'Telecom Stocks',
      stocks: []
    }];

    $scope.addNewList = function() {
      if ($scope.newListName === '') return;
      $rootScope.myStockLists.push({name: $scope.newListName, stocks: []});
      $scope.newListName = '';
    };

    $scope.myCustomProfiles = [{
      name: 'Custom Value Profile'
    }, {
      name: 'Custom Growth Profile'
    }];

    $http.get('/api/stocks').success(function(stocks){
      var stock, myStock;
      var listIndex = $scope.watchlistIndex;
      var watchlistsStocks = $rootScope.myStockLists[listIndex].stocks;
      for (stock in stocks) {
        for (myStock in watchlistsStocks) {
          if (watchlistsStocks[myStock].symbol === stocks[stock].symbol) {
            watchlistsStocks.push({quote: stocks[stock].quote[0]});
          }
        }
      }
    });
  });
