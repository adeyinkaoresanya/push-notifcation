const express = require("express");
const register = require("../controllers/registerController");
const message = require("../controllers/sendNotificationsController");

const router = express.Router();



router.post('/register', register);
router.post('/send-notifications', message);



  


  module.exports = router;