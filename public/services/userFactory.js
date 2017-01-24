(function() {
    'use strict';

    angular
        .module('app')
        .factory('UserFactory', function($http, AuthTokenFactory, $q) {
            return {
                login : function(username, password) { /* Запрос к api для получение токена */
                    return $http.post('/login', {
                        username: username,
                        password: password
                    })
                        .then(function success(response) {
                            /* При успешном получении токена сохраняем его в Local Storage */
                            AuthTokenFactory.setToken(response.data.token);

                            return response;
                        });
                },
                logout: function() {
                    AuthTokenFactory.setToken();
                },
                getUser: function() {
                    if(AuthTokenFactory.getToken()) {
                        return $http.get('/me');
                    } else {
                        return $q.reject({data: 'Нет токена'});
                    }
                }
            };
        });
})();