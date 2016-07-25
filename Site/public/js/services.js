app.service('checkArr', function() {
	this.isArrayEmpty = function(arr) {
		if(arr.length == 0) {
			return true;
		}
		return false;
	};
});

app.service('db', function($http, $q) {
	
	this.getPorts = function() {
		var deferred = $q.defer();

		return $http.get('/show/getAllPorts')
		.then(function(response) {
			deferred.resolve(response.data);
			return deferred.promise;
		}, function(error) {
			deferred.reject(error);
			return deferred.promise;
		});
	};

	this.getSwitches = function() {
		var deferred = $q.defer();

		return $http.get('/show/getSwitches')
		.then(function(response) {
			deferred.resolve(response.data);
			return deferred.promise;
		}, function(error) {
			deferred.reject(error);
			return deferred.promise;
		});
	};

	this.getPortsOfSwitch = function(switch_number) {
		var deferred = $q.defer();

		return $http.post('/show/getPortsOfSwitch', {switch: switch_number})
		.then(function(response) {
			deferred.resolve(response.data);
			return deferred.promise;
		}, function(error) {
			deferred.reject(error);
			return deferred.promise;
		})
	}
});