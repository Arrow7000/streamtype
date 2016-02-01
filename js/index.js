(function() {
    var app = angular.module('flowstate', []);

    app.controller('mainController', function($scope, $interval) {
        $scope.timer = 15 * 60 * 1000;
        $scope.deleteTimer = 5 * 1000;

        $interval(function() {
            $scope.timer -= 1000;
        }, 1000);


        $interval(function() {
            if ($scope.deleteTimer > 0) $scope.deleteTimer -= 10;
        }, 10);











    });
})()
