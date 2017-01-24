(function() {
  'use strict';

  angular
    .module('app', ['ngRoute'], function config($httpProvider, $routeProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');

      $routeProvider
          .when('/', {
              templateUrl: '/views/index.html'
          })
          .when('/users', {
              templateUrl: '/views/users.html',
              // controller: 'EditUserCtrl'
          })
          .when('/create-user', {
              templateUrl: '/views/create-user.html'
          })
          .when('/users/:id', {
              templateUrl: '/views/edit-user.html'
          })
          .otherwise({
              redirectTo: '/'
          });
    });
})();
