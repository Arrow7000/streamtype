(function() {
	var app = angular.module('flowstate', []);

	app.controller('mainController', function($scope, $interval) {
		$scope.delTimeInit = 5 * 1000;
		$scope.text = "";
		$scope.timer = 15 * 60 * 1000;
		$scope.deleteTimer = $scope.delTimeInit;
		var empty = true;

		$interval(function() {
			$scope.timer -= 1000;
		}, 1000);


		$interval(function() {
			if (!empty && $scope.deleteTimer > 0) $scope.deleteTimer -= 10;
			if (!empty && $scope.deleteTimer <= 2.5 * 1000) $scope.deleteEverything();
			console.log("empty?", empty);
		}, 10);


		document.addEventListener("keydown", keydown, false);

		function keydown(e) {
			empty = false;
			$scope.deleteTimer = $scope.delTimeInit;
			console.log($scope.text);
		}


		var container = angular.element(document.querySelector('#container'));
		$scope.deleteEverything = function() {
			empty = true;
			container.empty();
			$scope.deleteTimer = $scope.delTimeInit;
			console.log("Timer ran out!");
		};




	});
})()
