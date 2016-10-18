(function () {
  'use strict';

  angular.module('tcl.core')
    .directive('tclList', tclList);

  function controller (
    $scope,
    tclItemService
  ) {
    var vm = this;

    function assignItemData (itemData) {
      vm.items = tclItemService.items;
    }

    function getItems () {
      return tclItemService.getItems()
        .then(assignItemData);
    }

    function setWatchers () {
      $scope.$watch(function () {
        return tclItemService.items;
      }, function (newValue, oldValue) {
        vm.items = newValue;
      });
    }

    function init () {
      getItems();
      setWatchers();
    }

    init();
  }

  function tclList () {
    return {
      restrict: 'E',
      template:
        '<md-list>' +
          '<md-list-item layout="row" hide-xs hide-sm>' +
            '<div flex="20">Hash</div>' +
            '<div flex="20">Input</div>' +
            '<div flex="20">User</div>' +
            '<div flex="20">Timestamp</div>' +
          '</md-list-item>' +
          '<md-list-item layout="row" layout-wrap ng-repeat="item in list.items">' +
            '<div flex="100" flex-gt-sm="20"><span hide-gt-sm>Hash: </span><span>{{ item.hash }}</span></div>' +
            '<div flex="100" flex-gt-sm="20"><span hide-gt-sm>Input: </span><span>{{ item.input }}</span></div>' +
            '<div flex="100" flex-gt-sm="20"><span hide-gt-sm>User: </span><span>{{ item.user }}</span></div>' +
            '<div flex="100" flex-gt-sm="20"><span hide-gt-sm>Timestamp: </span><span>{{ item.timestamp }}</span></div>' +
          '</md-list-item>' +
        '</md-list>',
      controller: [
        '$scope',
        'tclItemService',
        controller
      ],
      controllerAs: 'list'
    };
  }
}());
