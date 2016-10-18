(function () {
  'use strict';

  angular.module('tcl.core')
    .directive('tclLogin', tclLogin);

  function controller (
    $scope,
    $state,
    tclUserService
  ) {
    var vm = this;

    function assignUserData (userData) {
      vm.user = userData;
    }

    function checkIfUserLoggedIn () {
      return tclUserService.getUser();
    }

    function logIn () {
      return tclUserService.setUser(vm.user)
        .then(redirectToListState);
    }

    function redirectToListState () {
      if (!vm.user || $state.is('list')) {
        return;
      }
      $state.go('list');
    }

    function setWatchers() {
      $scope.$watch(function () {
        return tclUserService.user;
      }, function (newValue, oldValue) {
        vm.user = newValue;
      });
    }

    function init () {
      return checkIfUserLoggedIn()
        .then(assignUserData)
        .then(redirectToListState)
        .then(setWatchers);
    }

    init();

    vm.logIn = logIn;
  }

  function tclLogin () {
    return {
      restrict: 'E',
      template:
        '<div class="tcl-flex-column tcl-full-size">' +
          '<form class="tcl-flex-column" name="login.tcl_login" ng-submit="login.logIn()">' +
            '<md-input-container>' +
              '<label>User email</label>' +
              '<input required name="email" type="email" ng-model="login.user" />' +
              '<div ng-messages="tcl_login.email.$error">' +
                '<div ng-message="required">Email is required</div>' +
                '<div ng-message="pattern">Please submit a correct email address</div>' +
              '</div>' +
            '</md-input-container>' +
            '<md-button type="submit">' +
              'Log in' +
            '</md-button>' +
          '</form>' +
        '</div>',
      controller: [
        '$scope',
        '$state',
        'tclUserService',
        controller
      ],
      controllerAs: 'login'
    };
  }
}());
