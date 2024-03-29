const Sequelize = require("sequelize");
const model = require("../db").dbConnection

const queue = model.define("queue", {
  userToken: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fToken: {
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

  messageStatus: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  }
});


queue.sync({ force: false })
    .then()
    .catch(error => console.error('Error creating table:', error));

module.exports = queue;
