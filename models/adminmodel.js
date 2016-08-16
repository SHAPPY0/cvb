var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var passportLocalMongoose=require('passport-local-mongoose');
var adminSchema=new Schema({
    username:String,
    password:String,
	name:String
	});

adminSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('admin', adminSchema);