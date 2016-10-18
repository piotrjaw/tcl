(function () {
  'use strict';

  angular.module('app', [
    'LocalStorageModule',
    'ui.router',
    'ngMaterial',
    'tcl.core',
    'tcl.addPage',
    'tcl.listPage',
    'tcl.loginPage'
  ])
    .config([
      'tclViewsProvider',
      config
    ]);

  function config (tclViewsProvider) {
    tclViewsProvider
      .otherwise('/login');
  }
}());
