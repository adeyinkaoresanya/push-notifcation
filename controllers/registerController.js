
const User= require("../database/models/userModel");



const register= async (req, res) => {
  const { userToken, fToken} = req.body;
  console.log (fToken)

  try {
    const existingToken =await User.findOne({ where: { fToken: fToken }});
    if (existingToken) {
            // delete FCM token already present
            await User.destroy({ where: { fToken: fToken }})
        } 
        const timeStamp = Math.floor(Date.now() / 1000)
        await User.create({ userToken, fToken, timeStamp});
        res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user' });
  }
};


module.exports= register








