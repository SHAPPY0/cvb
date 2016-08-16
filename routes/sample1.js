var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	 res.render('sample1', {title:"Preview CV"});
  });
	 
module.exports = router;
