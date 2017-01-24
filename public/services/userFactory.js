(function() {
  'use strict';

  angular
    .module('app')
    .factory('UserFactory', function UserFactory($http, AuthTokenFactory, $q) {
      return {
        login : login,
        logout: logout,
        getUser: getUser
      };

      function login(username, password) { /* Запрос к api для получение токена */
        return $http.post('/login', {
          username: username,
          password: password
        })
        .then(function success(response) {
          /* При успешном получении токена сохраняем его в Local Storage */
          AuthTokenFactory.setToken(response.data.token);

          return response;
        });
      }

      function logout() {
        AuthTokenFactory.setToken();
      }

      function getUser() {
        if(AuthTokenFactory.getToken()) {
          return $http.get('/me');
        }
        else {
          return $q.reject({data: 'Нет токена'});
        }
      }
    });
})();