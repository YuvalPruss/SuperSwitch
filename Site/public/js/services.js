app.service('checkArr', function() {
	this.isArrayEmpty = function(arr) {
		if(arr.length == 0) {
			return true;
		}
		return false;
	};
});