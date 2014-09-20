'use strict';

angular.module('stockSlateApp')
  .controller('SideMenuCtrl', function ($scope, $http, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.stockLists = [{
      name: 'List A'
    }, {
      name: 'List B'
    }];

    //change shit based on list name
    $scope.selectedList = function(listName) {

    };

    $scope.createNewList = function() {
      if ($scope.listName === '') {
        return; //provide feedback
      }
      Auth.createList($scope.listName);
    };
  });
