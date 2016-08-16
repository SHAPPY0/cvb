var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	 res.render('createcv', {title:"Create New CV"});
  });
	 
module.exports = router;
