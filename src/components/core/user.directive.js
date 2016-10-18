(function () {
  'use strict';

  angular.module('tcl.core')
    .directive('tclUser', tclUser);

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

    function logOut () {
      return tclUserService.removeUser();
    }

    function redirectToLoginState () {
      if (vm.user || $state.is('login')) {
        return;
      }
      $state.go('login');
    }

    function setWatchers() {
      $scope.$watch(function () {
        return tclUserService.user;
      }, function (newValue, oldValue) {
        vm.user = newValue;
        redirectToLoginState();
      });
    }

    function init () {
      return checkIfUserLoggedIn()
        .then(assignUserData)
        .then(redirectToLoginState)
        .then(setWatchers);
    }

    init();

    vm.logOut = logOut;
  }

  function tclUser () {
    return {
      restrict: 'E',
      template:
        '<div class="tcl-flex-row">' +
          '<p ng-if="user.user">{{ user.user }}</p>' +
          '<md-button ng-if="user.user" ng-click="user.logOut()">' +
            'Log out' +
          '</md-button>' +
        '</div>',
      controller: [
        '$scope',
        '$state',
        'tclUserService',
        controller
      ],
      controllerAs: 'user'
    };
  }
}());
