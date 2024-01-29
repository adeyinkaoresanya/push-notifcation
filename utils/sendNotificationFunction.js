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


module.exports= sendNotification;
