const Admin = require('../models/StudentModel');
const Category = require('../models/categoryModel');
const jwtData = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const otp = require('otp-generator');


module.exports.insertData = (req,res) =>{
    Admin.create({
        S_name : req.body.name,
        S_email : req.body.email,
        S_password : req.body.password,
        S_phone : req.body.phone,
        S_city : req.body.city,
        S_course : req.body.course,
        S_fees : req.body.fees,
        F_id : req.body.F_id,
        F_name : req.body.F_name,
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

    Admin.findOne({S_email:req.body.email},(err,data)=>{
        if(err){
            res.json(err);
            return false;
        }
        if(!data||data.S_password != req.body.password){

            return res.json({"Status" : "0","message" : "Email & Password Not Vaild"});
        }else{
            const token = jwtData.sign(data.toJSON(),"StData",{expiresIn:1000*60*60});
            res.cookie(
                'login',token
            )
            return res.json({"Status" : "1","message" : token});
        }
    });
}
module.exports.addcategory = (req,res)=>
{   
        Category.create({
            F_name : req.body.name
        },(err,cdata)=>
        {
            if(err)
            {
                res.json(err);
                return false;
            }else{
                return   res.json({"Status":"1","Messege":"Category Add"});
            }
        });
}

module.exports.viewsubcategory = (req,res) =>
{
    Admin.findOne({F_id : req.query.id},(err,data)=>{
        if(err){
            return res.json(err);
        }
        console.log(data);
        Admin.aggregate([
            {
                $match : {'F_id' : data.F_id}
            },
            {
                $lookup:
                {
                    from:"categories",
                    localField:"F_id",
                    foreignField:"_id",
                    as:"faculty_id"
                }
            }  
        ],(err,data)=>
        {
            if(err)
            {
                console.log(err);
                return false;
            }else{
                res.json({"Status":"1","Messege":data});
            }
        });
    });
}
module.exports.viewstudent = (req,res) =>{
    let token = req.cookies.login;
    let view = oo(token);
    Admin.findById(view._id,(err,data)=>{
        if(err)
        {
            return res.json(err);
        }
        return res.json({"message" : data});
    })


}

function oo(viewdata) {
    return JSON.parse(Buffer.from(viewdata.split('.')[1],'base64').toString());
}

module.exports.profileupdate = (req,res) =>{
    let id = req.query.id;
    Admin.findByIdAndUpdate(id,{
        S_name : req.body.name,
        S_email : req.body.email,
        S_password : req.body.password,
        S_phone : req.body.phone,
        S_city : req.body.city,
        S_course : req.body.course,
        S_fees : req.body.fees,
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
    Admin.findOne({S_email : req.body.email},(err,data)=>{
        if(err){
            return res.json({'Status' : '0' ,'message' : 'Email not founds'});
        }
        console.log(data);
        let transporter = nodemailer.createTransport({
            service : 'gmail',
            auth: {
                user: "kishanaravadiya6820@gmail.com",
                pass: 'vrpliyeanmbbxuch', 
            },
        });

            let mailOptions = {
                from: 'kishanaravadiya6820@gmail.com',
                to: data.S_email,
                subject: 'Sending Email using Node.js',
                text: 'That was easy!',
                html : 'OTP is Been'  +  cotp
            };
            
            transporter.sendMail(mailOptions,(error, info)=>{
                if (error) {
                    console.log(error);
                }
                res.cookie('userotp',{
                    email : data.S_email,
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

            Admin.findOneAndUpdate({S_email : email},{
                S_password:  newpassword
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
