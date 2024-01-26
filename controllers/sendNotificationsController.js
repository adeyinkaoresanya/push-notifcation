
const messageModel= require("../database/models/messageModel");



const message= async (req, res) => {
  const { fTokens, message} = req.body;

  try {
    const serializedfTokens = JSON.stringify(fTokens);

    await messageModel.create({ fTokens: serializedfTokens, message}); 
 
    res.status(201).json({ message: 'Notification sent to users successfully' });
  } catch (err) {
    console.error(err);
   // TODO res.status(500).json({ message: 'Error ' });
    res.status(500).json({ message: 'Error ' });
  }
};




module.exports= message;
