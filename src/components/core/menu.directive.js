(function () {
  'use strict';

  angular.module('tcl.core')
    .directive('tclMenu', tclMenu);

  function controller (
    $scope,
    $state,
    tclUserService
  ) {
    var vm = this;
    var MENU_ITEMS = [
      {
        id: 'list',
        caption: 'List'
      },
      {
        id: 'add',
        caption: 'Add'
      }
    ];

    function goTo (view) {
      $state.go(view);
    }

    function isSelected (view) {
      return $state.is(view);
    }

    function setWatchers() {
      $scope.$watch(function () {
        return tclUserService.user;
      }, function (newValue, oldValue) {
        vm.user = newValue;
      });
    }

    function init () {
      setWatchers();
    }

    init();

    vm.goTo = goTo;
    vm.isSelected = isSelected;

    vm.items = MENU_ITEMS;
  }

  function tclMenu () {
    return {
      restrict: 'E',
      template:
        '<div ng-if="menu.user">' +
          '<md-button ng-repeat="item in menu.items" ng-class="{\'md-primary\': menu.isSelected(item.id)}" ng-click="menu.goTo(item.id)">{{ ::item.caption }}</md-button>' +
        '</div>',
      controller: [
        '$scope',
        '$state',
        'tclUserService',
        controller
      ],
      controllerAs: 'menu'
    };
  }
}());
