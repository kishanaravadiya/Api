const Admin = require('../models/AdminModel');

const jwtData = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const otp = require('otp-generator');

module.exports.insertData = (req,res) =>{
    Admin.create({
        F_name : req.body.name,
        F_email : req.body.email,
        F_password : req.body.password,
        F_phone : req.body.phone,
        F_designation : req.body.designation,
        F_city : req.body.city,
    },(err,data)=>{
        if(err){
          res.json({"status" : "0","message" : "Can't InsertData"});
          return false;
        }else{
            return res.json({"status" : "1","message" : "Data Succefully InsertData"})
        }
    });
}

module.exports.logidata = (req,res) =>{

    Admin.findOne({F_email:req.body.email},(err,data)=>{
        if(err){
            res.json(err);
            return false;
        }
        if(!data||data.F_password != req.body.password){

            return res.json({"Status" : "0","message" : "Email & Password Not Vaild"});
        }else{
            const token = jwtData.sign(data.toJSON(),"Data",{expiresIn:1000*60*60});
            res.cookie('facultyToken',token)
            return res.json({"Status" : "1","message" : token});
        }
    });
}

module.exports.profileupdate = (req,res) =>{
    let id = req.body.id;
    Admin.findByIdAndUpdate(id,{
        F_name : req.body.name,
        F_email : req.body.email,
        F_password : req.body.password,
        F_phone : req.body.phone,
        F_designation : req.body.designation,
        F_city : req.body.city,
    },(err,data)=>{
        if(err){
             res.json({'Status' : '0','message' : 'Profile Not Update'});
             return false;
        }else{
            res.json({'Status' : '1','message' : 'Profile Update Succefully'});
        }
    })
}
module.exports.forgetpass = (req,res) =>{
    let cotp = otp.generate(6,{
        upperCaseAlphabets : false,
        lowerCaseAlphabets : false,
        specialChars : false
    });
    Admin.findOne({F_email : req.body.email},(err,data)=>{
        if(err){
            return res.json({'Status' : '0' ,'message' : 'Email not founds'});
        }
        let transporter = nodemailer.createTransport({
            service : 'gmail',
            auth: {
                user: "kishanaravadiya6820@gmail.com",
                pass: 'vrpliyeanmbbxuch', 
            },
        });

            let mailOptions = {
                from: 'kishanaravadiya6820@gmail.com',
                to: data.F_email,
                subject: 'Sending Email using Node.js',
                text: 'That was easy!',
                html : 'OTP is Been'  +  cotp
            };
            
            transporter.sendMail(mailOptions,(error, info)=>{
                if (error) {
                    console.log(error);
                }
                res.cookie('userotp',{
                    email : data.F_email,
                    otp : cotp
                });
                return res.json({'Email sent: ' : cotp});
            });  
    })
}

module.exports.otp = (req,res) =>{
    if(req.cookies.userotp.otp == req.body.otp)
    {
        res.json({"Status" : "1","messege" : "Otp Succesfully Match"});
        return false;
    }else{
        res.json({'Status' : '0','message' : 'Otp Not Match'});
    }
}

module.exports.newpassdata = (req,res) =>{
    let newpassword = req.body.newpassword;
    let cpassword = req.body.cpassword;
    


    if(newpassword == cpassword){
        let email = req.cookies.userotp.email;

            Admin.findOneAndUpdate({F_email : email},{
                F_password:  newpassword
            },(err,data)=>{
                console.log(data);
                if(err){
                    res.json(err);
                    return false;
                }
                return res.json({'Status':'1','message':'Password Succesfully Chnaged'})
            })
        
        
    }
    else{
        return res.json({"Messege":"Newpassword and confirm password are not match"})
    }
    
}