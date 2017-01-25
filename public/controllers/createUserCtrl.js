(function() {
    'use strict';
    angular
        .module('app')
        .controller('CreateUserCtrl', function($scope, $http) {
            $scope.createForm = { email: '', username: '' };

            $scope.createUser = function() {
                var newUser = {
                    username: $scope.createForm.username,
                    email:    $scope.createForm.email
                };
                console.log(234555);
                $http.post('/create', newUser).then(function success(response) {
                    newUser._id = response.data;
                    console.log($scope.users);
                    location.hash = '#!/users';
                }, function() {
                    alert('Ошибка при создании пользователя.');
                });
            };

        });
})();