(function() {
	var app = angular.module('flowstate', []);

	app.controller('mainController', function($scope, $interval) {

		var debug = false;

		$scope.delTimeInit = 15 * 1000;
		$scope.timerInit = 5 * 60 * 1000;

		$scope.timer = $scope.timerInit;
		$scope.deleteTimer = $scope.delTimeInit;

		$scope.started = false;

		$scope.ctn = angular.element(document.querySelector('#container'));


		$scope.font = "lustria";

		$scope.showSplash = true;

		$interval(function() {
			$scope.showSplash = false;
		}, 3000);



		$interval(function() { // 1/100th second interval counter
			if ($scope.started && $scope.deleteTimer > 0) { // Before timer hits 0
				$scope.deleteTimer -= 100; // Makes deletion timer decrement 
			}
			if ($scope.started && $scope.deleteTimer <= 0 * 1000) { // When timer hits zero
				$scope.deleteEverything();
			}
			if (!$scope.started) {
				$scope.timer = $scope.timerInit;
			} else {
				$scope.timer -= 100;
			}


		}, 100);


		document.addEventListener("keyup", keyup, false);
		document.addEventListener("keydown", keydown, false);

		function keyup(e) {
			typeEvent(e);
		}

		function keydown(e) {
			typeEvent(e);
		}





		$scope.deleteEverything = function() {
			$scope.ctn.empty();
			$scope.deleteTimer = $scope.delTimeInit;
			$scope.started = false;
			if (debug) console.log("Timer ran out!");
		};




		// Fires on both keydown and keyup events.
		function typeEvent(e) {
			if (debug) {
				console.log("Typing...");
				console.log("$scope.started", $scope.started);
				console.log("$scope.ctn.text().length", $scope.ctn.text().length);
			}

			$scope.deleteTimer = $scope.delTimeInit;
			if ($scope.ctn.text().length > 0) $scope.started = true;
		}



	});










})()
