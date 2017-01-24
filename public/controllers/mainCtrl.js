(function() {
    'use strict';
    angular
        .module('app')
        .controller('MainCtrl', function MainCtrl(UserFactory, $scope, $http) {
            // console.log('$routeParams.id', $routeParams.id);
        //     vm.login = function(username, password) {
        //         UserFactory.login(username, password)
        //             .then(function success(response) {
        //                 vm.user = response.data.user;
        //                 getUsersFromDb();
        //             }, handleError);
        //     };
        //     vm.logout = function() {
        //         UserFactory.logout();
        //         vm.user = null;
        //     };
            UserFactory.getUser()
                .then(function success(response) {
                    location.hash = '!/users';
                }, function(err) {
                    location.hash = '!/';
                    console.error(err);
                });
        //     $scope.$on('$routeChangeSuccess', function() {
        //         vm.idEditingUser = $routeParams.id;
        //         if(vm.idEditingUser){
        //             var editUser = findUserById(vm.idEditingUser);
        //             vm.editFormUsername = editUser['username'];
        //             vm.editFormEmail = editUser['email'];
        //         }
        //     });
        });
})();