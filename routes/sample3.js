var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	 res.render('sample3', {title:"Preview CV"});
  });
	 
module.exports = router;
