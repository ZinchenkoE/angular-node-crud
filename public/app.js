(function() {
    'use strict';

    angular
        .module('app', ['ngRoute'], function($httpProvider, $routeProvider) {
            $httpProvider.interceptors.push('AuthInterceptor');

            $routeProvider
                .when('/', {
                    templateUrl: '/views/index.html'
                })
                .when('/login', {
                    templateUrl: '/views/login.html'
                })
                .when('/registration', {
                    templateUrl: '/views/registration.html',
                    resolve: true
                })
                .when('/users', {
                    templateUrl: '/views/users.html'
                })
                .when('/create-user', {
                    templateUrl: '/views/create-user.html'
                })
                .when('/users/:id', {
                    templateUrl: '/views/edit-user.html'
                })
                .otherwise({
                    redirectTo: '/login'
                });
        });
})();
