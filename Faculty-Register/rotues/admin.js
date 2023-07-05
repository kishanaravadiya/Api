const express = require('express');
const passport = require('passport');


const router = express.Router();

const Admincontroller = require('../controllers/AdminController');

router.post('/insertData',Admincontroller.insertData);
router.post('/logidata',Admincontroller.logidata);
router.patch('/profileupdate',passport.authenticate('jwt',{session:false}),Admincontroller.profileupdate);
router.post('/forgetpass',passport.authenticate('jwt',{session:false}),Admincontroller.forgetpass);
router.post('/otp',Admincontroller.otp);
router.post('/newpassdata',Admincontroller.newpassdata);

module.exports = router;