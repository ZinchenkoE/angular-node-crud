(function() {
    'use strict';

    angular
        .module('app')
        .factory('AuthInterceptor', function(AuthTokenFactory) {
            return {
                request:  function(config) {
                    /* Добавить к запросу заголовок с токеном */
                    var token = AuthTokenFactory.getToken();

                    if(token) {
                        config.headers = config.headers || {};
                        config.headers.Authorization = 'Bearer ' + token;
                    }

                    return config;
                }
            };
        });
})();


// angular.module('application.auth.interceptors')
//     .service('AuthInterceptor', function ($injector, $location) {
//         var AuthInterceptor = {
//             request: function (config) {
//                 var Auth = $injector.get('Auth');
//                 var token = Auth.getToken();
//
//                 if (token) {
//                     config.headers['Authorization'] = 'JWT ' + token;
//                 }
//                 return config;
//             },
//
//             responseError: function (response) {
//                 if (response.status === 403) {
//                     $location.path('/login');
//                 }
//                 return response;
//             }
//         };
//         return AuthInterceptor;
//     });