const sendNotification = require("../utils/sendNotification")
const queueModel= require("../database/models/QueueModel")


const sendNotificationToAllUsers= async () => {
        try {
          const users =  await queueModel.findAll({
            where: {
              status: 0
            },
            order: [['createdAt', 'ASC']],
            raw: true
          });

         

        


          // const notificationPromises = [];
      
        users.forEach(user => {
          console.log(user.fToken, user.message)
          notificationPromises.push(sendNotification(user.fToken, user.message));
               
          // const notificationResults = await Promise.all(notificationPromises);
      
          // // Update scores based on results
          // notificationResults.forEach((result, index) => {
          //   if (!result.success) {
          //     users[index].score--;
          //     await users[index].save();
          //   }
          });
      
          // res.json({ message: 'Notifications sent' });
        } catch (err) {
          console.error(err);
          //res.status(500).json({ message: 'Error sending notifications' });
        }
      };

  sendNotificationToAllUsers()    
//module.exports= sendNotificationToAllUsers






