var express = require('express');
var router = express.Router();
var db = require('./../models/db.js');

var mydb = new DBHandler();
mydb.connect();

router.post('/addSwitch', function(req, res) {
	var new_switch = req.body.switch;

	var sql = "insert into switches (name) values ('" + String(new_switch.name) + "')";

	mydb.connection.query(sql, function(err) {
		if(err) { return res.send(false); }
		return res.send(true);
	});
});

router.post('/addPort', function(req, res) {
	var new_port = req.body.port;

	var sql = "insert into ports (switch, module_number, port_number, system, description) " +
	"values (" + String(new_port.switch) + ", " + String(new_port.module_number) + " , " + String(new_port.port_number) +
	" , '" + String(new_port.system) + "'	 , '" + String(new_port.description) + "')";

	mydb.connection.query(sql, function(err) {
		if(err) { return res.send(false); }
		return res.send(true);
	});
});

module.exports = router;