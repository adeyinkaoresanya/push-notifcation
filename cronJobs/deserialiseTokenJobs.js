//const {Op} = require('sequelize');
//const nodeScheduler = require('node-scheduler');
const messageModel = require("../database/models/messageModel")
const queueModel = require("../database/models/QueueModel")
const userModel = require("../database/models/userModel")


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
      const userTokens= JSON.parse(messageDetail.dataValues.userTokens)
      const message = messageDetail.dataValues.message
      const users = await userModel.findAll({ raw: true })
      const usersDetails = users.filter(obj => userTokens.includes(obj.userToken));

      await Promise.all(usersDetails.map(async (user) => {
        const { userToken, fToken } = user;

        queue = await queueModel.create({ userToken, fToken, message});
      
  
      }))

      messageDetail.status = 1;
      console.log(messageDetail)
      await messageDetail.save();
    }

    console.log('Job run successfully');
    
  } catch (error) {
    console.error('Error executing:', error);
  }
}


console.log(deserialiseTokens())

// Schedule the job to run every 5 minutes
// nodeScheduler.scheduleJob('* * * * *', deserialiseTokens);


