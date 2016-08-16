var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	 res.render('sample2', {title:"Preview CV"});
  });
	 
module.exports = router;
