const express= require("express");
const bodyParser= require("body-parser");
const connectToDB = require("./database/db").connectToDB;


const routes= require("./routes/routes");

const app=express();

const PORT = 3000;


app.use(express.json());

app.use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }));


app.use("/", routes);


connectToDB();

app.listen(PORT, ()=>{
    console.log(`server is listening at PORT ${PORT}`)
})