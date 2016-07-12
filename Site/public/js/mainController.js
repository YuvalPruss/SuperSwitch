app.controller("mainContoller", function($scope, $http, $rootScope, $location) {
	$scope.isArrEmty = function(arr) {
		if(arr.length == 0) {
			return true;
		}
		return false;
	};

	$scope.switches = [];
	$scope.ports = [];

	$http.get('/actions/getSwitches').success(function(data) {
		$scope.switches = data;
		if($scope.switches.length != 0) {
			$scope.setSwitch($scope.switches[0].id);
		}
	});

	$scope.setSwitch = function(switchNumber) {
		$scope.switch = switchNumber;
		
		$http.post('/actions/getPortsOfSwitch', {switch: $scope.switch}).success(function(data) {
			$scope.ports = data;
		});
	};

	$scope.isSwitch = function(switchNumber ) {
		return $scope.switch == switchNumber;
	};

	$scope.showPort = function(module, port) {
		
	};
});