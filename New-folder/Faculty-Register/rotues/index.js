const express = require('express');

const route = express.Router();

console.log("Rotues is Working");

route.use('/admin',require('./admin'));


module.exports = route;