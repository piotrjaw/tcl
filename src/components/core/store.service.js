(function () {
  'use strict';

  angular.module('tcl.core')
    .factory('tclStoreService', [
      '$q',
      'localStorageService',
      StoreService
    ]);

  function StoreService (
    $q,
    localStorageService
  ) {
    function getStoreValue (key) {
      return $q.when(localStorageService.get(key));
    }

    function removeStoreValue (key) {
      return $q.when(localStorageService.remove(key));
    }

    function setStoreValue (key, value) {
      return $q.when(localStorageService.set(key, value));
    }

    return {
      getStoreValue: getStoreValue,
      removeStoreValue: removeStoreValue,
      setStoreValue: setStoreValue
    };
  }

}());
