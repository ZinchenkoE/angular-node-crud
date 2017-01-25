(function() {
    'use strict';
    angular
        .module('app')
        .controller('MainCtrl', function MainCtrl(UserFactory, $scope) {
            $scope.userIsLogged = false;
            $scope.registrationForm = {};
            $scope.loginForm = {};

            $scope.login = function() {
                UserFactory.login($scope.loginForm.email, $scope.loginForm.password)
                    .then(function() {
                        $scope.userIsLogged = true;
                        location.hash = '#!/';
                    }, function(err){
                        console.error(err);
                        alert(err.data);
                    });
            };

            $scope.registration = function() {
                if($scope.registrationForm.password != $scope.registrationForm.confirmPassword){
                    alert('Пароли не совпадают');
                    return false;
                }
                var newUser = {
                    username: $scope.registrationForm.username,
                    email:    $scope.registrationForm.email,
                    password: $scope.registrationForm.password
                };
                UserFactory.registration(newUser)
                    .then(function() {
                        $scope.userIsLogged = true;
                        location.hash = '#!/';
                    }, function(res) {
                        if(res.status == 400){
                            alert(res.data);
                        }else{
                            alert('Произошла ошибка при регистрации');
                        }
                    });
            };

            $scope.logout = function() {
                UserFactory.logout();
                $scope.userIsLogged = false;
                location.hash = '#!/';
            };

            UserFactory.getUser()
                .then(function () {
                    $scope.userIsLogged = true;
                    console.log('getUser success');
                }, function(err) {
                    location.hash = '#!/login';
                    console.error('getUser err', err);
                });
        });
})();