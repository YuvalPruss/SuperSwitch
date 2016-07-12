var mysql = require("mysql");
var Promise = require("bluebird");

DBHandler = function() {
	this.connection = mysql.createConnection({
		host		: 'localhost',
		user		: 'root',
		password 	: '',
		database	: 'ports',
		charset		: "utf8_general_ci"
	});
};

DBHandler.prototype.connect = function() {
	try
	{
		this.connection.connect();
		return true;
	}
	catch(err)
	{
		console.log(err);
		return false;
	}	
};

DBHandler.prototype.runSQL = function(sql) {
	return new Promise(function(resolve, reject) {
		this.connection.query(sql, function(err) {
			if(err){ return reject(err); }
			return resolve();
		});
	});
};