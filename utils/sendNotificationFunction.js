const admin = require("../config/fireBaseConfig");

//this takes an array of fToken and the message (String) we want to send'
async function sendNotification(fToken, message) {
    const messageBody = {
      notification: {
        title: 'Notification',
        body: message
      },
      token: fToken
    };
  
    try {
      const response = await admin.messaging().send(messageBody);
      return { success: true, response, fToken, message };
    } catch (err) {
      console.error('Notification failed:', err);
      return { success: false, error: err };
    }
  }

// token = "eh2P1LbygGAMasndaVtHQx:APA91bGEF6ADYFmqH3uds9ovnAcJgaPDzJWd_DbMMUYeasqGmkW4IH9FdxXYEVrPCd-gPLT3oNhkGr_QDdQD8Wpn9Vh5eUZUuzRKfZE7H5YowTbhjKyuUEUgMXga7hZyxZYK8Z5W9saB"
// message= "Welcome to Reni"
// console.log(sendNotification(token, message))
module.exports= sendNotification;
