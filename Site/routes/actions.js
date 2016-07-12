var express = require('express');
var router = express.Router();
var db = require('./../models/db.js');
var Promise = require('bluebird');

var mydb = new DBHandler();

mydb.connect();


/***
Add Actions
***/

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


/***
Get Actions
***/

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

/***
Delete Actions
***/

router.post('/deleteSwitch', function(req, res) {
	var switch_number = req.body.switch.id;
	
	delete_switch_from_switches(switch_number)
	.then(function(answer) {
		delete_switch_from_ports(switch_number);
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
	var switch_number = req.body.switch;
	var module_number = req.body.module;

	delete_module_from_ports(switch_number, module_number)
	.then(function(answer) {
		return res.send(true);
	})
	.catch(function(err) {
		console.log(err);
		return res.send(false);
	});
});

router.post('/deletePort', function(req, res) {
	var switch_number = req.body.port.switch;
	var module_number = req.body.port.module;
	var port_number = req.body.port.port;

	delete_port_from_ports(switch_number, module_number, port_number)
	.then(function(answer) {
		return res.send(true);
	})
	.catch(function(err) {
		console.log(err);
		return res.send(false);
	});
});

var delete_switch_from_switches = function(switchNumber) {
	return new Promise(function(resolve, reject) {
		var sql = 'delete from switches where id = ' + switchNumber;

		mydb.connection.query(sql, function(err) {
			if(err){ return reject(err); }
			return resolve();
		});
	});	
};

var delete_switch_from_ports = function(switchNumber) {
	return new Promise(function(resolve, reject) {
		var sql = 'delete from ports where switch = ' + switchNumber;

		mydb.connection.query(sql, function(err) {
			if(err){ return reject(err); }
			return resolve();
		});
	});	
};

var delete_module_from_ports = function(switchNumber, moduleNumber) {
	return new Promise(function(resolve, reject) {
		var sql = 'delete from ports where module_number = ' + String(moduleNumber) + " and switch = " + String(switchNumber);

		mydb.connection.query(sql, function(err) {
			if(err){ return reject(err); }
			return resolve();
		});
	});
};

var delete_port_from_ports = function(switchNumber, moduleNumber, portNumber) {
	return new Promise(function(resolve, reject) {
		var sql = "delete from ports where module_number = " + String(moduleNumber) + " and switch = " + String(switchNumber) + " and port_number = " + String(portNumber);
		
		console.log(sql);

		mydb.connection.query(sql, function(err) {
			if(err){ return reject(err); }
			return resolve();
		});
	});
};

module.exports = router;