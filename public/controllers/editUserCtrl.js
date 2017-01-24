(function() {
    'use strict';
    angular
        .module('app')
        .controller('EditUserCtrl', function($scope, $http, $routeParams) {
            $http.get('/get-users').then(function(res) {
                $scope.users = res.data;
            });

            if($routeParams.id){
                var editUser = $scope.users.find(function(i) {return i._id == $routeParams.id});
                $scope.editFormUserId   = $routeParams.id;
                $scope.editFormUsername = editUser['username'];
                $scope.editFormEmail    = editUser['email'];
            }

            $scope.editUser = function() {
                var data = {
                    _id: $scope.editFormUserId,
                    username: $scope.editFormUsername,
                    email: $scope.editFormEmail
                };
                $http.put('/edit', data).then(function() {
                    $scope.users.forEach(function(user, key) {
                        if(user._id == $scope.editFormUserId) $scope.users[key] = data;
                    });
                    location.hash = '!/users';
                }, function() {
                    alert('Ошибка при редактировании пользователя');
                });
            };
            $scope.delUser = function(id) {
                if(confirm('Уверены что хотите удалить пользователя.')){
                    $http.delete('/delete/' + id).then(function() {
                        $scope.users.forEach(function(user, i) {
                            if(user._id == id){ $scope.users.splice(i, 1); }
                        });
                    }, function() {
                        alert('Ошибка при удалении пользователя.');
                    });
                }
            };
        });
})();