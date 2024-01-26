const Sequelize = require("sequelize");
const model = require("../db").dbConnection

const message= model.define("messages", {
  fTokens: {
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
    .then()
    .catch(error => console.error('Error creating table:', error));

module.exports = message;


