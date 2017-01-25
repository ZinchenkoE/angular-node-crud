(function() {
    'use strict';
    angular
        .module('app')
        .controller('EditUserCtrl', function($scope, $http, $routeParams) {
            $scope.editForm = {};
            $http.get('/get-users').then(function(res) {
                $scope.users = res.data;
                if($routeParams.id){
                    var editUser = $scope.users.find(function(i) {return i._id == $routeParams.id});
                    $scope.editForm.userId   = $routeParams.id;
                    $scope.editForm.username = editUser['username'];
                    $scope.editForm.email    = editUser['email'];
                }
            }, function(err) {
                console.error(err);
                location.hash = '#!/login';
            });

            $scope.editUser = function() {
                var data = {
                    _id:      $scope.editForm.userId,
                    username: $scope.editForm.username,
                    email:    $scope.editForm.email
                };
                $http.put('/edit', data).then(function() {
                    $scope.users.forEach(function(user, key) {
                        if(user._id == $scope.editForm.userId) $scope.users[key] = data;
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