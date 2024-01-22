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
      return { success: true, response };
    } catch (err) {
      console.error('Notification failed:', err);
      return { success: false, error: err };
    }
  }



  module.exports= sendNotification
