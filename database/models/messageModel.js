const Sequelize = require("sequelize");
const model = require("../db").dbConnection

const message= model.define("messages", {
  userTokens: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});


message.sync({ force: false })
    .then(() => console.log('Table created successfully'))
    .catch(error => console.error('Error creating table:', error));

module.exports = message;


