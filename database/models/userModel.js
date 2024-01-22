// models/user.js
const Sequelize = require("sequelize");
const model = require("../db").dbConnection

const user = model.define("User", {
  userToken: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fToken: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  timeStamp: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 10,
  },

  status: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  }
});


user.sync({ force: false })
    .then(() => console.log('Table created successfully'))
    .catch(error => console.error('Error creating table:', error));

module.exports = user;
