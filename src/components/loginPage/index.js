(function () {
  'use strict';

  angular.module('tcl.loginPage', [])
    .config([
      'tclViewsProvider',
      config
    ]);

  function config (
    tclViewsProvider
  ) {
    tclViewsProvider
      .state('login', {
        url: '/login',
        templateUrl: 'components/loginPage/views/index.html'
      });
  }
}());
