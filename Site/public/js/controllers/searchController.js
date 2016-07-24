app.controller('searchController', function($scope, $http, $rootScope, $location, checkArr) {
	$scope.isArrEmty = checkArr.isArrayEmpty;

	$scope.search_notes = "אנא הקלד חיפוש כלשהו";
	$scope.search_string = "";
	$scope.ports = [];
	$scope.switches = [];

	$http.get('/show/getSwitches').success(function(data) {
		$scope.switches = data;
	});

	$scope.search = function() {
		if($scope.search_string == '') {
			$scope.search_notes = "אנא הקלד חיפוש כלשהו";
			$scope.ports = [];
		}
		else
		{
			$scope.search_notes = "תוצאות החיפוש עבור: " + $scope.search_string;
			$http.post('/search', {search_string: $scope.search_string}).success(function(data) {
				$scope.ports = data;
			});
		}
		
	};

	$scope.switchNumberToSwitchName = function(switchNumber) {
		for (var i = $scope.switches.length - 1; i >= 0; i--) {
			if($scope.switches[i].id == switchNumber) {
				return $scope.switches[i].name;	
			}
		}
	};
});