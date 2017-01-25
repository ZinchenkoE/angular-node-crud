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
