'use strict';

angular.module('stockSlateApp')
  .controller('MainCtrl', function ($scope, $http, $rootScope) {
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
      }, {
        name: 'Facebook Inc.',
        symbol: 'FB'
      }]
    }, {
      name: 'Retail Stocks',
      stocks: [{
        name: "Target Corp",
        symbol: "TGT"
      }]
    }, {
      name: 'Automotive Stocks',
      stocks: [{
        name: 'Tesla Motors Inc',
        symbol: 'TSLA'
      }]
    }];

    $scope.columnNameSort = 'name';
    $scope.reverseSort = false;

    $scope.defaultText = 'N/A';

    $scope.addNewList = function() {
      if ($scope.newListName === '' || !$scope.newListName) return;
      $rootScope.myStockLists.push({name: $scope.newListName, stocks: []});
      $scope.newListName = '';
      $scope.watchlistIndex = $rootScope.myStockLists.length - 1;
      $scope.investorProfile = '';
    };

    $scope.myCustomProfiles = [{
      name: 'Custom Value Profile'
    }, {
      name: 'Custom Growth Profile'
    }];

    $scope.deleteStock = function(index) {
      $rootScope.myStockLists[$scope.watchlistIndex].stocks.splice(index, 1);
    };

    $scope.deleteList = function() {
      $rootScope.myStockLists.splice($scope.watchlistIndex, 1);
      $scope.setWatchlistIndex(0);
    };

    $scope.onTypeAheadSelect = function(item, model, label) {
      $rootScope.myStockLists[$scope.watchlistIndex].stocks.push({name: item.name, quote: item.quote[0], symbol: item.symbol});
      $scope.selectedStock = '';
    };

    $http.get('/api/stocks').success(function(stocks) {
      var listIndex = $scope.watchlistIndex;
      var myStockLists = $rootScope.myStockLists;
      $scope.allStocks = stocks;
      //XXX super mega evil hack:
      for (var i = 0; i < myStockLists.length; i++) {
        for (var j = 0; j < myStockLists[i].stocks.length; j++) {
          for (var k = 0; k < stocks.length; k++) {
            if (myStockLists[i].stocks[j].symbol === stocks[k].symbol) {
              myStockLists[i].stocks[j].quote = stocks[k].quote[0];
            }
          }
        }
      }
    });
  });
