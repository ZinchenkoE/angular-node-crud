(function() {
    'use strict';
    angular
        .module('app')
        .controller('CreateUserCtrl', function($scope, $http) {
            $scope.createFormUsername = '';
            $scope.createFormEmail = '';

            $scope.createUser = function() {
                var newUser = {
                    username: $scope.createFormUsername,
                    email:    $scope.createFormEmail
                };
                $http.post('/create', newUser).then(function(response) {
                    newUser._id = response.data;
                    $scope.users.push(newUser);
                    location.hash = '!/users';
                }, function() {
                    alert('Ошибка при создании пользователя.');
                });
            };

        });
})();