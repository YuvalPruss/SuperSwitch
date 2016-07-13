var express = require('express');
var router = express.Router();
var db = require('./../models/db.js');

var mydb = new DBHandler();
mydb.connect();

router.get('/getSwitches', function(req, res) {
	var sql = "select * from switches";

	mydb.connection.query(sql, function(err, rows) {
		if(err) { return res.send(false); }
		return res.send(rows);
	});
});

router.post('/getPortsOfSwitch', function(req, res) {
	var switch_number = req.body.switch;
	
	var sql = "select * from ports where switch = " + String(switch_number) + " order by module_number";

	mydb.connection.query(sql, function(err, rows) {
		if(err) { return res.send(false); }
		return res.send(rows);
	});
});


router.get('/getAllPorts', function(req, res) {
	var sql = "select * from ports ";

	mydb.connection.query(sql, function(err, rows) {
		if(err) { return res.send(false); }
		return res.send(rows);
	});
});

module.exports = router;