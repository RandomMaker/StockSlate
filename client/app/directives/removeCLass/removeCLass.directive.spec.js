'use strict';

describe('Directive: removeCLass', function () {

  // load the directive's module
  beforeEach(module('stockSlateApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<remove-c-lass></remove-c-lass>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the removeCLass directive');
  }));
});