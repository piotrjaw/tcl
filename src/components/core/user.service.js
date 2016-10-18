(function () {
  'use strict';

  angular.module('tcl.core')
    .factory('tclUserService', [
      'tclStoreService',
      UserService
    ]);

  function UserService (tclStoreService) {
    var exports = {
      user: ''
    };

    function getUser () {
      return tclStoreService.getStoreValue('user').then(updateUser);
    }

    function removeUser () {
      return tclStoreService.removeStoreValue('user').then(updateUser);
    }

    function setUser (user) {
      return tclStoreService.setStoreValue('user', user)
        .then(getUser);
    }

    function updateUser (userData) {
      exports.user = userData;
    }

    exports.getUser = getUser;
    exports.setUser = setUser;
    exports.removeUser = removeUser;
    exports.updateUser = updateUser;

    return exports;

  }

}());
