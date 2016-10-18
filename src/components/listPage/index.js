(function () {
  'use strict';

  angular.module('tcl.listPage', [])
    .config([
      'tclViewsProvider',
      config
    ]);

  function config (
    tclViewsProvider
  ) {
    tclViewsProvider
      .state('list', {
        url: '/list',
        templateUrl: 'components/listPage/views/index.html',
        onEnter: [
          '$state',
          'tclUserService',
          function (
            $state,
            tclUserService
          ) {
            if (tclUserService.user) {
              return;
            }
            $state.go('login');
          }
        ]
      });
  }
}());
