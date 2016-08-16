var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var grid = require("gridfs-stream");
var mime = require('mime-types');
var moment = require('moment'); 
var adminModel=require('../models/adminmodel');
var cvModel=require('../models/cvmodel');

// index page--admin login view
router.get('/', function(req, res, next){
res.render('index', {title:'Admin Login' });});


// admin registration
 	 router.post('/register', function(req, res, next){
	 adminModel.register(new adminModel({username:req.body.username, name:req.body.name}),req.body.password, function(err, admindata){
		 if(err){res.json(err)}
		 else{
			 res.render('register',{title:'Successfully Register'});
			 }
		 });
	 }) ;
	 
// admin login
	router.post('/home', passport.authenticate('adminn'), function(req, res, next){
		cvModel.find({}, function(err, cvdata){
			if(err){res.json(err);}
				else{res.render('home', {title:'Successfully Login', data:cvdata });}
});});	
//home page
	router.get('/home',isAuthenticate, function(req, res, next){
		cvModel.find({}, function(err, cvdata){
			if(err){res.json(err);}
				else{
					res.render('home', {title:"Download CVs",data:cvdata});  
					};
		});});
router.post('/search', function(req, res, next){
			cvModel.find({ 'personaldetails.candidatename': req.body.searchbox }, function(err, cvdata){
				if(err){res.json(err);}
				else{res.render('home', {title:"Download CVs", data:cvdata});};
				});
			});
	//admin logout
		router.get('/logout', function(req, res) {
  		req.session.destroy();
 		 res.redirect('/');
		});
// if user not loggedin
	
function isAuthenticate (req, res, next) {
  if (!req.user) {
    res.redirect('/');
  } else {
    next();
  }
};

 router.get('/create', isAuthenticate, function(req, res, next){
	 res.render('createcv', {title:"CV Created Successfully"});
	 });
	 
	// create cv=============
	router.post('/create',isAuthenticate, function(req, res, next){
		var x = Math.floor((Math.random() * 10006680) + 1);
		var d=new Date();
		var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
		var date=d.getDate();
		var month=d.getMonth();
		var year=d.getFullYear();
		var totaldate= date+ " " +monthNames[month]+ " "+year;
		var addpersonal={candidatename:req.body.candidatename,permanentaddress:req.body.permanentaddress,permanentcity:req.body.permanentcity,permanentstate:            req.body.permanentstate,dob:req.body.dob,email:req.body.email,mobile:req.body.mobile,mailingaddress:req.body.mailingaddress,city:req.body.city,	            state:req.body.state,country:req.body.country};
		var addskills={primaryskill:req.body.primaryskill, secondaryskill:req.body.secondaryskill};
		var addprofessionaldetails={totalexperience:req.body.totalexperience, employementtype:req.body.employementtype,
		company : {companyname:req.body.companyname, industry:req.body.industry,jobtitle:req.body.jobtitle,startdate:req.body.prevstartdate,enddate:req.body.   				prevenddate,roles:req.body.roles}};
		var addcvdetails={cvtitle:req.body.cvtitle, jobcategory:req.body.jobcategory, objective:req.body.objective};
		var addeducation={highschool:{course:req.body.hscourse,school:req.body.hsschool,startdate:req.body.hsstartdate,enddate:req.body.hsenddate,percantage:		    		req.body.hspercantage},
			seniorsecondaryschool:{course:req.body.sscourse,school:req.body.ssschool,startdate:req.body.ssstartdate,enddate:req.body.ssenddate,percantage:
			req.body.sspercantage},
			undergraduation:{course:req.body.ug,university:req.body.uguniversity,startdate:req.body.ugstartdate,enddate:req.body.ugenddate,percantage:
			req.body.ugpercantage},
			postgraduation:{course:req.body.pg,university:req.body.pguniversity,startdate:req.body.pgstartdate,enddate:req.body.pgenddate,percantage:
			req.body.pgpercantage},};
		new cvModel({
			personaldetails:addpersonal,
			skills:addskills,
			professionaldetails:addprofessionaldetails,
			cv:addcvdetails,
			educationaldetails:addeducation,
			posted:totaldate,
			resumeID:x,
			}).save(function(err, cvdata){
				if(err){res.json(err);}
				else{
					
					res.render('createcv', {title:"CV Created Successfully", data:cvdata});}
			});
				
		});
		 
// view single cv		
		router.get('/cvpreview/:id',isAuthenticate, function(req,res){
				cvModel.find({ }, function(err, docs){
					if(err){res.json(err);}
					else{res.render('cvpreview', {title:"CV Preview", data:req.cvId});}
					});
			});
			router.get('/sample1/:id',isAuthenticate, function(req,res){
				cvModel.find({ }, function(err, docs){
					if(err){res.json(err);}
					else{res.render('sample1', {title:"sample1", data:req.cvId});}
					});
			});
			router.get('/sample2/:id',isAuthenticate, function(req,res){
				cvModel.find({ }, function(err, docs){
					if(err){res.json(err);}
					else{res.render('sample2', {title:"sample2", data:req.cvId});}
					});
			});
			router.get('/sample3/:id',isAuthenticate, function(req,res){
				cvModel.find({ }, function(err, docs){
					if(err){res.json(err);}
					else{res.render('sample3', {title:"sample3", data:req.cvId});}
					});
			});
// param cv ID			
router.param('id', function(req,res,next,id){
				cvModel.findById(id, function(err, docs){
				if(err) res.json(err);
				else{req.cvId=docs; next();}
			});
	});
	
//edit cv
	router.get('/edit/:id',isAuthenticate, function(req, res, next){
		cvModel.find({}, function(err, docs){
			if(err){res.json(err);}
			else{res.render('edit', {title:"Edit CV", data:req.cvId});}
			});
		});
	router.post('/edit/:id',isAuthenticate, function(req, res, next){
		var x = Math.floor((Math.random() * 123456680) + 1);
		var d=new Date();
		var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
		var date=d.getDate();
		var month=d.getMonth();
		var year=d.getFullYear();
		var totaldate= date+ " " +monthNames[month]+ " "+year;
		var addpersonal={candidatename:req.body.candidatename,permanentaddress:req.body.permanentaddress,permanentcity:req.body.permanentcity,permanentstate:            req.body.permanentstate,dob:req.body.dob,email:req.body.email,mobile:req.body.mobile,mailingaddress:req.body.mailingaddress,city:req.body.city,	            state:req.body.state,country:req.body.country};
		var addskills={primaryskill:req.body.primaryskill, secondaryskill:req.body.secondaryskill};
		var addprofessionaldetails={totalexperience:req.body.totalexperience, employementtype:req.body.employementtype,company:{companyname:req.body.						            companyname,industry:req.body.industry,jobtitle:req.body.jobtitle,startdate:req.body.prevstartdate,enddate:req.body.prevenddate,roles:req.body.roles}};
		var addcvdetails={cvtitle:req.body.cvtitle, jobcategory:req.body.jobcategory, objective:req.body.objective};
		var addeducation={highschool:{course:req.body.hscourse,school:req.body.hsschool,startdate:req.body.hsstartdate,enddate:req.body.hsenddate,percantage:		    		req.body.hspercantage},
			seniorsecondaryschool:{course:req.body.sscourse,school:req.body.ssschool,startdate:req.body.ssstartdate,enddate:req.body.ssenddate,percantage:
			req.body.sspercantage},
			undergraduation:{course:req.body.ug,university:req.body.uguniversity,startdate:req.body.ugstartdate,enddate:req.body.ugenddate,percantage:
			req.body.ugpercantage},
			postgraduation:{course:req.body.pg,university:req.body.pguniversity,startdate:req.body.pgstartdate,enddate:req.body.pgenddate,percantage:
			req.body.pgpercantage},};
	 cvModel.update({_id:req.params.id}, {
			personaldetails:addpersonal,
			skills:addskills,
			professionaldetails:addprofessionaldetails,
			cv:addcvdetails,
			educationaldetails:addeducation,
			posted:totaldate,
			},function(err, cvdata){
				if(err){res.json(err);}
				else{res.render("edit/" +req.cvId, {title:"CV Updated SuccessFully", data:req.cvId});}
			});
				
		});
// delete cv
		router.get('/delete/:id', function(req, res, next){
			cvModel.remove({_id:req.params.id}, function(err, cvdata){
				if(err){res.json(err);}
				else{cvModel.find({}, function(err, cvdata){
			if(err){res.json(err);}
				else{
					res.render('home', {title:"Download CVs",data:cvdata});  
					};
		});}
				});
		});
module.exports = router;
