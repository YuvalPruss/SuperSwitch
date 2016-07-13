var express = require('express');
var router = express.Router();
var db = require('./../models/db.js');

var mydb = new DBHandler();
mydb.connect();

router.post('/deleteSwitch', function(req, res) {
	var switch_number = String(req.body.switch.id);

	var sql = 'delete from ports where switch = ' + switch_number;
	var sql2 = 'delete from ports where switch = ' + switch_number;
	
	mydb.runSQL(sql)
	.then(function(answer) {
		mydb.runSQL(sql2);
	})
	.then(function(answer) {
		return res.send(true);
	})
	.catch(function(err) {
		console.log(err);
		return res.send(false);
	});
});

router.post('/deleteModule', function(req, res) {
	var switch_number = String(req.body.switch);
	var module_number = String(req.body.module);

	var sql = 'delete from ports where module_number = ' + module_number + " and switch = " + switch_number;

	mydb.runSQL(sql)
	.then(function(answer) {
		return res.send(true);
	})
	.catch(function(err) {
		console.log(err);
		return res.send(false);
	});
});

router.post('/deletePort', function(req, res) {
	var switch_number = String(req.body.port.switch);
	var module_number = String(req.body.port.module);
	var port_number = String(req.body.port.port);

	var sql = "delete from ports where module_number = " + module_number + " and switch = " + switch_number + " and port_number = " + port_number;

	mydb.runSQL(sql)
	.then(function(answer) {
		return res.send(true);
	})
	.catch(function(err) {
		console.log(err);
		return res.send(false);
	});
});

module.exports = router;