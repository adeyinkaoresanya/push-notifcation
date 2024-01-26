//const nodeScheduler = require('node-scheduler');
const messageModel = require("../database/models/messageModel");
const queueModel = require("../database/models/QueueModel");
const userModel = require("../database/models/userModel");
const { Op } = require("sequelize")



// Function to handle the cron job task
async function deserialiseTokens() {
  try {
    const messageDetail = await messageModel.findOne({
      where: {
        status: 0
      },
      order: [['createdAt', 'ASC']],
      limit: 1
    });

    if(messageDetail){
      const { fTokens, message } = messageDetail.dataValues;
      const parsedTokens = JSON.parse(fTokens);

     const existingUsers = await userModel.findAll({
       where: { fToken: { [Op.in]: parsedTokens } },
       attributes: ['userToken', 'fToken'],
     });
    
      await Promise.all(existingUsers.map(async (user) => {
        const { userToken, fToken } = user;

      queue = await queueModel.create({ userToken, fToken, message});
      }
      ))

    

      messageDetail.status = 1;
      await messageDetail.save();
     }

    console.log('Job run successfully');
    
  } catch (error) {
    console.error('Error executing job:', error);
  }
}


console.log(deserialiseTokens())

// Schedule the job to run every 5 minutes
// nodeScheduler.scheduleJob('* * * * *', deserialiseTokens);


