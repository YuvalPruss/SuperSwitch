var express = require('express');
var router = express.Router();
var db = require('./../models/db.js');

var mydb = new DBHandler();
mydb.connect(); 

router.post('/', function(req, res) {
	var search_string = req.body.search_string;

	var sql = 	"select ports.* from ports join switches on switches.id = ports.switch where " +
				"ports.description like '%" + search_string + "%'" + 
				" or ports.system like '%" + search_string + "%'" + 
				" or ports.port_number like '%" + search_string + "%'" + 
				" or ports.module_number like '%" + search_string + "%'" +
				" or switches.name like '%" + search_string + "%'";

	mydb.connection.query(sql, function(err, rows) {
		if(err) { return res.send(false); }
		return res.send(rows);
	});
});

module.exports = router;