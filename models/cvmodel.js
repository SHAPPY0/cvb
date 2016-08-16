var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var cvschema=new Schema({
   personaldetails:{candidatename:String,
					permanentaddress:String,
					permanentcity:String,
					permanentstate:String,
					dob:Date,
					email:{type:String, unique:true},
					mobile:Number,
					mailingaddress:String,
					city:String,
					state:String,
					country:String,
	   				},
	educationaldetails:{
						highschool:{
									course:String,
									school:String,
									startdate:Date,
									enddate:Date,
									percantage:Number,
									},
						seniorsecondaryschool:{
									course:String,
									school:String,
									startdate:Date,
									enddate:Date,
									percantage:Number,
									},
						undergraduation:{
									course:String,
									university:String,
									startdate:Date,
									enddate:Date,
									percantage:Number,
									},
						postgraduation:{
									course:String,
									university:String,
									startdate:Date,
									enddate:Date,
									percantage:Number,
									},
		 },
		skills:{
				primaryskill:String,
				secondaryskill:String,
				} ,
		professionaldetails:{
				totalexperience:Number,
				employementtype:String,
				company: {
						companyname:String,
						industry:String,
						jobtitle:String,
						startdate:Date,
						enddate:String,
						roles:String}
				},
		cv:{
			cvtitle:String,
			jobcategory:String,
			objective:String,
			},	
		posted:String,
		resumeID:Number,	
	});
 

module.exports=mongoose.model('cvs', cvschema);