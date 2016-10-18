(function () {
  'use strict';

  angular.module('tcl.addPage', [])
    .config([
      'tclViewsProvider',
      config
    ]);

  function config (
    tclViewsProvider
  ) {
    tclViewsProvider
      .state('add', {
        url: '/add',
        templateUrl: 'components/addPage/views/index.html',
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
