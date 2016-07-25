app.controller("mainContoller", function($scope, $http, $rootScope, $location, checkArr, db) {
	$scope.isArrEmty = checkArr.isArrayEmpty;

	$scope.switches = [];
	$scope.ports = [];

	db.getSwitches()
	.then(function(result) {
		$scope.switches = result;

		if($scope.switches.length != 0) {
			$scope.setSwitch($scope.switches[0].id);
		}

	}, function(error) {
		console.log(error);
	});


	$scope.setSwitch = function(switchNumber) {
		$scope.switch = switchNumber;

		db.getPortsOfSwitch($scope.switch)
		.then(function(result) {
			$scope.ports = result;
		}, function(error) {
			console.log(error);
		});

	};

	$scope.isSwitch = function(switchNumber ) {
		return $scope.switch == switchNumber;
	};

});