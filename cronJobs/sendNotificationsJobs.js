const sendNotification = require("../utils/sendNotificationFunction");
const queueModel= require("../database/models/QueueModel")
const userModel=require("../database/models/userModel")


const sendNotificationToAllUsers= async () => {
        try {
          const QueuedMessages =  await queueModel.findAll({
            where: {
              status: 0
            },
            order: [['createdAt', 'ASC']],
            raw: true
          });


        const notificationPromises = [];
      
        QueuedMessages.forEach(queuedUser => {
          notificationPromises.push(sendNotification(queuedUser.fToken, queuedUser.message));
        });

               
          const notificationResults = await Promise.all(notificationPromises);
          
      
          //Update scores based on results

        // This needs to be worked on;
          notificationResults.forEach(async(result) => {
    
            if (!result.success) {
              const unAvailableUser = await userModel.findOne({where: { fToken: result.fToken} });
             
              unAvailableUser.score -= 2;
      //console.log(unAvailableUser)
            await unAvailableUser.save();
     
            } else{
              const notifiedUser = await queueModel.findOne({where: { fToken: result.fToken, message: result.message } });
              console.log(notifiedUser)
              notifiedUser.status = 1;
          await notifiedUser.save();
            }
          });
      
          res.json({ message: 'Notifications sent' });
        } catch (err) {
          console.error(err);
          //res.status(500).json({ message: 'Error sending notifications' });
        }
      };

  console.log(sendNotificationToAllUsers())   
//module.exports= sendNotificationToAllUsers






