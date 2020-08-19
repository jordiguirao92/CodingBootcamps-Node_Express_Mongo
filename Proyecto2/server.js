require('dotenv').config()
const express = require("express");
var cors = require('cors');
const BodyParser =  require("body-parser");
const mongoose = require('mongoose');
const User =  require("./Models/User");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const app = express();

app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.post('/v1/user/signup',(req,res)=>{
    const user = new User({
        email:req.body.email,
        password:req.body.password
    }).save((error,response)=>{
        if (error) res.status(400).send(error);
        res.status(200).send(response);
    })
});

app.post('/v1/user/login',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) res.status(400).send('Invalid username or password')
        else{
            user.comparePassword(req.body.password, (err, isMatch)=>{
                if(err) throw err;
                if(!isMatch) return res.status(400).send('Invalid username or password')
                res.status(200).send('Logged in successfully')
            });
        } 
    });
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${server.address().port}`);
  });