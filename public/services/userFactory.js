(function() {
    'use strict';

    angular
        .module('app')
        .factory('UserFactory', function($http, AuthTokenFactory, $q) {
            return {
                login : function(email, password) { /* Запрос к api для получение токена */
                    return $http.post('/login', {
                        email: email,
                        password: password
                    }).then(function (response) {
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
                },

                registration: function(newUser) {
                    return $http.post('/registration', {
                        username: newUser.username,
                        email:    newUser.email,
                        password: newUser.password
                    }).then(function (response) {
                        AuthTokenFactory.setToken(response.data.token);
                        return response;
                    });
                }
            };
        });
})();