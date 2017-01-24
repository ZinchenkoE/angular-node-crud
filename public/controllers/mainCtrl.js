(function() {
    'use strict';
    angular
        .module('app')
        .controller('MainCtrl', function MainCtrl(UserFactory, $scope, $http, $rootScope) {

            $rootScope.$on('$locationChangeStart', function(e){
                if(!$scope.userIsLogined && location.hash != '#!/login') {
                    location.hash = '#!/login';
                    console.log(!$scope.userIsLogined && location.hash != '#!/login');
                    e.preventDefault();
                    return false;
                }
            });



            $scope.login = function(username, password) {
                UserFactory.login(username, password)
                    .then(function() {
                        $scope.userIsLogined = true;
                    }, function(err){ console.error(err); });
            };

            $scope.registration = function(username, password) {
                UserFactory.registration(username, password)
                    .then(function() {
                        $scope.userIsLogined = true;
                    }, function(err){ console.error(err); });
            };


            $scope.logout = function() {
                UserFactory.logout();
                $scope.userIsLogined = false;
            };

            UserFactory.getUser()
                .then(function () {
                    location.hash = '#!/users';
                }, function(err) {
                    location.hash = '#!/login';
                    console.error(err);
                });
        });
})();