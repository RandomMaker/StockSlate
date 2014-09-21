'use strict';

angular.module('stockSlateApp')
  .directive('removeClass', function () {
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            element.removeClass(attrs.removeClass);
        }
    };
  });
