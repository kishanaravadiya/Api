const express = require('express');
const passport = require('passport');


const router = express.Router();

const Admincontroller = require('../controllers/StudentController');

router.post('/insertData',Admincontroller.insertData);
router.post('/logidata',Admincontroller.logidata);
router.post('/addcategory',passport.authenticate('jwt',{session:false}),Admincontroller.addcategory);
router.get('/viewsubcategory',passport.authenticate('jwt',{session:false}),Admincontroller.viewsubcategory);
router.get('/viewstudent',passport.authenticate('jwt',{session:false}),Admincontroller.viewstudent);
router.post('/profileupdate',passport.authenticate('jwt',{session:false}),Admincontroller.profileupdate);
router.post('/forgetpass',Admincontroller.forgetpass);
router.post('/otp',Admincontroller.otp); 
router.post('/newpassdata',Admincontroller.newpassdata); 


module.exports = router;