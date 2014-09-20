'use strict';

angular.module('stockSlateApp')
  .controller('SideMenuCtrl', function ($scope, $http, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.getLists = function() {
      // $http.get('/' + )
    };
    $scope.createNewList = function() {
      if ($scope.listName === '') {
        return; //provide feedback
      }
      Auth.createList($scope.listName, $scope.getLists());
    };
  });
