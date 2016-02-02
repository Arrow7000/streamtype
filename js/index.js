(function() {
	var app = angular.module('flowstate', []);

	app.controller('mainController', function($scope, $interval) {

		$scope.delTimeInit = 5 * 1000;
		$scope.timerInit = 15 * 60 * 1000;

		$scope.timer = $scope.timerInit;
		$scope.deleteTimer = $scope.delTimeInit;

		$scope.started = false;

		$scope.ctn = angular.element(document.querySelector('#container'));


		// $interval(function() { // Second interval counter
		// 	$scope.timer -= 1000;
		// }, 1000);

		$interval(function() { // 1/100th second interval counter
			if ($scope.ctn.text().length > 0 && $scope.deleteTimer > 0) { // Before timer hits 0
				$scope.deleteTimer -= 10; // Makes deletion timer decrement 
			}
			if ($scope.ctn.text().length > 0 && $scope.deleteTimer <= 0 * 1000) { // When timer hits zero
				$scope.deleteEverything();
			}
			if (!$scope.started) {
				$scope.timer = $scope.timerInit;
			} else {
				$scope.timer -= 10;
			}


		}, 10);


		document.addEventListener("keyup", keyup, false);

		function keyup(e) {
			console.log("Key up!");
			console.log("$scope.started", $scope.started);
			console.log("$scope.ctn.text().length", $scope.ctn.text().length);


			$scope.deleteTimer = $scope.delTimeInit;
			if ($scope.ctn.text().length > 0) $scope.started = true;
		}



		$scope.deleteEverything = function() {
			$scope.ctn.empty();
			$scope.deleteTimer = $scope.delTimeInit;
			$scope.started = false;
			console.log("Timer ran out!");
		};




	});
})()
