var express=require('express');
var path=require('path');
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var expressSession=require('express-session');
var moment = require('moment'); 
var app=express();
require('./db');
var adminModel=require('./models/adminmodel');

//Configuring Routes
var routes = require('./routes/index');
var register = require('./routes/register');
var homeX = require('./routes/home');
var createcv = require('./routes/createcv');
var cvpreview = require('./routes/cvpreview');
var sample1 = require('./routes/sample1');
var sample2 = require('./routes/sample2');
var sample3 = require('./routes/sample3');
var edit = require('./routes/edit');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app uses configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(expressSession({cookieName:'session', secret: 'keyboard catoard cat', resave: true, duration:30*60*1000, activeDuration:5*60*1000  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
app.locals.fromNow=function(date){
	return moment(date).fromNow();
};

/*app.use(function(req, res, next){
	if(req.session && req.session.user){ 
		adminModel.findOne({user:req.session.user}, function(err, admin){ 
			if(admin){
				admin=req.user;
				req.session.user=admin;
				res.locals.admin=admin; 
				}next();
			});
		}else{next();}
				console.log(req.user);
	});*/
	
app.use('/', routes);
app.use('/register', register);
app.use('/home', homeX);
app.use('/create', createcv);
app.use('/cvpreview', cvpreview);
app.use('/edit', edit);


   /*=======passport configuration========*/
passport.use("adminn", new LocalStrategy(adminModel.authenticate()));
passport.serializeUser(function(user, done){
	done(null, user.id);
	});
passport.deserializeUser(function(id, done){
	adminModel.findById(id, function(err, user){
		done(err, user);
		});
	});
 
	

//create server
var port=process.env.PORT||3000
app.listen(port, function(){
	console.log('Server is running  localhost:3000');
	});