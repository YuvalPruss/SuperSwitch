app.controller("mainContoller", function($scope, $http, $rootScope, $location, checkArr) {
	$scope.isArrEmty = checkArr.isArrayEmpty;

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