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
        name: 'Cisco Systems Inc',
        symbol: 'CSCO'
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

    $http.get('/api/stocks').success(function(stocks) {
      var listIndex = $scope.watchlistIndex;
      var myStockLists = $rootScope.myStockLists;

      for (var i = 0; i < myStockLists.length; i++) {
        for (var j = 0; j < myStockLists[i].stocks.length; j++) {
          for (var k = 0; k < stocks.length; k++) {
            // console.log(stocks[k]);
            // if (!stocks[k]) continue;
            if (myStockLists[i].stocks[j].symbol === stocks[k].symbol) {
              console.log(myStockLists[i].stocks);
              myStockLists[i].stocks[j].quote =  stocks[k].quote[0];
            }
          }
        }
      }


      // for (stock in stocks) {
      //   for (myStock in myStockLists) {
      //     if (myStockLists[myStock].symbol === stocks[stock].symbol) {
      //       myStockLists.push({quote: stocks[stock].quote[0]});
      //     }
      //   }
      // }
    });
  });
