const passport = require('passport');
const Admin = require('../models/AdminModel');

const mongoose = require('./mongoose');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'Data';


passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    
    Admin.findOne({id: jwt_payload._id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));