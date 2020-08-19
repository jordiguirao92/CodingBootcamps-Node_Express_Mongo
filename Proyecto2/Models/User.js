const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
let SALT = 12;
const userSchema = mongoose.Schema({
    email :{
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true,
    },
    password :{
        type:String,
        required:true,
        minlength:6
    }
});

/**Encrypting the password before storing it to database*/
userSchema.pre('save',function(next){
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(SALT, function(err,salt){
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err,hash){
                if(err) return next(err);
                user.password=hash;
                next();
            })
        })
    }
    else{
        next();
    }
});

userSchema.methods.comparePassword = function(enteredPassword,checkPassword){
    bcrypt.compare(enteredPassword,this.password,function(err,isMatch){
        if(err) return checkPassword(err);
        checkPassword(null, isMatch);
    });
}

module.exports = mongoose.model('User', userSchema);
 