(function() {
  'use strict';

      angular
      .module('app')
      .factory('AuthTokenFactory', function($window) {
          var store = $window.localStorage;
          var key = 'auth-token';

          return {
              getToken: function() {
                  return store.getItem(key);
              },
              setToken: function(token) {
                  if(token) {
                      store.setItem(key, token);
                  } else {
                      store.removeItem(key);
                  }
              }
          };
      });
})();