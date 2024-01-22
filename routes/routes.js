const express = require("express");
const router= express.Router();
const register = require("../controllers/registerController");
const message = require("../controllers/sendNotificationsController");



router.post('/register', register);
router.post('/send-notifications', message);



  


  module.exports = router