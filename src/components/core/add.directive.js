(function () {
  'use strict';

  angular.module('tcl.core')
    .directive('tclAdd', tclAdd);

  function controller (
    $mdToast,
    $scope,
    $timeout,
    tclHashService,
    tclItemService,
    tclUserService
  ) {
    var vm = this;

    function add () {
      console.log(vm);
      var item = {
        input: vm.string,
        hash: tclHashService.hash(vm.string),
        user: tclUserService.user,
        timestamp: new moment().format('YYYY-MM-DD, HH:mm:ss:SSS')
      };

      return tclItemService.addItem(item)
        .then(displaySuccessMessage)
        .then(clearInput);
    }

    function clearInput () {
      vm.string = '';
      if (!vm.tcl_add) {
        return;
      }
      vm.tcl_add.$setPristine();
    }

    function displaySuccessMessage () {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Successfully added item to list!')
          .position('bottom right')
          .hideDelay(5000)
      );
    }

    function init () {
      clearInput();
    }

    init();

    vm.add = add;
  }

  function tclAdd () {
    return {
      restrict: 'E',
      template:
        '<div class="tcl-flex-column tcl-full-size">' +
          '<form class="tcl-flex-column" name="add.tcl_add" ng-submit="add.add()">' +
            '<md-input-container>' +
              '<label>Input string</label>' +
              '<input required name="string" type="text" ng-model="add.string" />' +
              '<div ng-messages="tcl_add.string.$error">' +
                '<div ng-message="required">String is required</div>' +
                '<div ng-message="maxlength">Maximum string lenght is 255 characters</div>' +
              '</div>' +
            '</md-input-container>' +
            '<md-button type="submit">' +
              'Add item' +
            '</md-button>' +
          '</form>' +
        '</div>',
      controller: [
        '$mdToast',
        '$scope',
        '$timeout',
        'tclHashService',
        'tclItemService',
        'tclUserService',
        controller
      ],
      controllerAs: 'add'
    };
  }
}());
