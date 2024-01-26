const Sequelize = require("sequelize");

const dotenv = require("dotenv");
dotenv.config();

const database = process.env.DATABASE;
const username = process.env.USER;
const password = process.env.PASSWORD;



const dbConnection = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "mysql",
});



function connectToDB(){

  dbConnection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

};

  


module.exports = {
  dbConnection,
  connectToDB
}