(function () {
  'use strict';

  angular.module('tcl.core')
    .provider('tclViews', [
      '$stateProvider',
      '$urlRouterProvider',
      ViewsProvider
    ]);

  function ViewsProvider (
    $stateProvider,
    $urlRouterProvider
  ) {
    function otherwise (state) {
      return $urlRouterProvider.otherwise(state);
    }

    function state (name, cfg) {
      return $stateProvider.state(name, cfg);
    }

    function ServiceProvider () {
      return {};
    }

    return {
      state: state,
      otherwise: otherwise,
      $get: [ServiceProvider()]
    };
  }

}());
