const express = require('express');

const route = express.Router();

console.log("Rotues is Working");

route.use('/admin',require('./admin'));
route.use('/studentadmin',require('./studentadmin'));

module.exports = route;