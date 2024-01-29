const messageModel = require("../database/models/messageModel");
const queueModel = require("../database/models/QueueModel");
const userModel = require("../database/models/userModel");
const { Op } = require("sequelize")



const deserialiseTokens = async () => {
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

    console.log('Tokens has been deserialised successfully');
    
  } catch (error) {
    console.error('Error deserialising tokens:', error);
  }
}




module.exports = deserialiseTokens


