app.controller('addController', function($scope, $http, $rootScope, $location, checkArr) {
	$scope.isArrEmty = checkArr.isArrayEmpty;
	
	$scope.panel = 1;

	$scope.setPanel = function(panel) {
		$scope.panel = panel;
	};

	$scope.isPanel = function(panel) {
		return $scope.panel == panel;
	};


	//Add Port
	$scope.submit_message_add_port = '';
	$scope.port = {
		switch : '',
		port_number : '',
		module_number: '',
		system: '',
		description: ''
	};

	$scope.switches = [];

	$http.get('/show/getSwitches').success(function(data) {
		$scope.switches = data;
	});

	$scope.addPort = function() {
		$http.post('/add/addPort', {port: $scope.port}).success(function(data) {
			if(data == "true") {
				$scope.submit_message_add_port = "הפורט נוצר בהצלחה!";
				$scope.port = {
					switch : '',
					port_number : '',
					module_number: '',
					system: '',
					description: ''
				};
			}
			else {
				$scope.submit_message_add_port = "בעיה ביצירת הפורט!";
			}
		});
	};

	//Add Switch
	$scope.submit_message_add_switch = '';
	$scope.switch = {
		name: ''
	};

	$scope.addSwitch = function() {
		if( $scope.switch.name != '' ) {
			$http.post('/add/addSwitch', {switch: $scope.switch}).success(function(data) {
				if(data == "true") {
					$scope.submit_message_add_switch = "המתג נוצר בהצלחה!";
					$scope.switch = {
						name: ''
					};
				}
				else {
					$scope.submit_message_add_switch = "בעיה ביצירת המתג!";
				}
			});
		}
		else
		{
			$scope.submit_message_add_switch = "חובה לציין את שם המתג!";
		}
	};
});