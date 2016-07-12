app.controller('deleteController', function($scope, $http, $rootScope, $location) {
	$scope.isArrEmty = function(arr) {
		if(arr.length == 0) {
			return true;
		}
		return false;
	};

	$scope.panel = 1;
	
	$scope.isPanel = function(panel) {
		return $scope.panel == panel;
	};

	$scope.setPanel = function(panel) {
		$scope.panel = panel;
	};


	
	//Delete Switch
	$scope.submit_message_delete_switch = '';
	$scope.switches = [];
	$scope.switch_delete = {id: ''};

	$http.get('/actions/getSwitches').success(function(data) {
		$scope.switches = data;
	});

	$scope.deleteSwitch = function() {
		$http.post('/actions/deleteSwitch', {switch: $scope.switch_delete}).success(function(data) {
			if(data == 'true') {
				//Delete the switch from the array
				for (var i = $scope.switches.length - 1; i >= 0; i--) {
					if($scope.switches[i].id == $scope.switch_delete.id) {
						$scope.switches.splice(i, 1);
					}
				}

				//Delete the ports of the switch from the array
				for (var i = $scope.ports.length - 1; i >= 0; i--) {
					if($scope.ports[i].switch == $scope.switch_delete.id)
					$scope.ports.splice(i, 1);
				}

				$scope.submit_message_delete_switch = 'המתג נמחק בהצלחה!';
			}
			else {
				$scope.submit_message_delete_switch = 'בעיה במחקית הפורט!';
			}
		});
	};

	//Delete Module
	$scope.submit_message_delete_module = '';
	$scope.ports = [];
	$scope.module_number = 0;
	$scope.switch_number = 0;

	$scope.isModule = function(switchNumber, moduleNumber) {
		return $scope.module_number == moduleNumber && $scope.switch_number == switchNumber;
	};

	$scope.setModule = function(switchNumber, moduleNumber) {
		$scope.module_number = moduleNumber;
		$scope.switch_number = switchNumber;
	};

	$http.get('/actions/getAllPorts').success(function(data) {
		$scope.ports = data;
	});

	$scope.switchNumberToSwitchName = function(switchNumber) {
		for (var i = $scope.switches.length - 1; i >= 0; i--) {
			if($scope.switches[i].id == switchNumber) {
				return $scope.switches[i].name;	
			}
		}
	};

	$scope.deleteModule = function() {
		$http.post('/actions/deleteModule', {module: $scope.module_number, switch: $scope.switch_number}).success(function(data) {
			if(data == 'true') {
				$scope.submit_message_delete_module = 'המודול נמחק בהצלחה!';

				//Delete the ports of the module from the array
				for (var i = $scope.ports.length - 1; i >= 0; i--) {
					if($scope.ports[i].module_number == $scope.module_number && $scope.ports[i].switch == $scope.switch_number) {
						$scope.ports.splice(i, 1);
					}
				}
			}
			else {
				$scope.submit_message_delete_module = 'בעיה במחקית המודול!';
			}
		});
	};

	//Delete Port
	$scope.submit_message_delete_port = '';
	$scope.choosen_port = {
		switch: 0,
		module: 0,
		port: 0
	};

	$scope.setPort = function(switchNumber, moduleNumber, portNumber) {
		$scope.choosen_port.switch = parseInt(switchNumber);
		$scope.choosen_port.module = parseInt(moduleNumber);
		$scope.choosen_port.port = parseInt(portNumber);
	};

	$scope.isPort = function(switchNumber, moduleNumber, portNumber) {
		return switchNumber == $scope.choosen_port.switch && moduleNumber == $scope.choosen_port.module && portNumber == $scope.choosen_port.port;
	};

	$scope.deletePort = function() {
		$http.post('/actions/deletePort', {port: $scope.choosen_port}).success(function(data) {
			if(data == "true") {
				$scope.submit_message_delete_port = "הפורט נמחק בהצלחה";

				//Delete the port from the array
				for (var i = $scope.ports.length - 1; i >= 0; i--) {
					if($scope.ports[i].module_number == $scope.choosen_port.module && $scope.ports[i].switch == $scope.choosen_port.switch && $scope.ports[i].port_number == $scope.choosen_port.port) {
						$scope.ports.splice(i, 1);
					}
				}
			}
			else {
				$scope.submit_message_delete_port = "בעיה במחקית הפורט!";
			}
		});
	};

});