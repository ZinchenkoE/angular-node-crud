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
                $http.post('/create', newUser).then(function success(response) {
                    newUser._id = response.data;
                    location.hash = '#!/users';
                }, function(res) {
                    if(res.status == 400){
                        alert(res.data);
                    }else{
                        alert('Ошибка при создании пользователя.');
                    }
                });
            };

        });
})();