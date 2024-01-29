const nodeScheduler = require("node-schedule");
const deserialiseTokens = require("../cronJobs/deserialiseTokenJobs");
const sendNotificationToAllUsers = require("../cronJobs/sendNotificationsJobs");


//Schedule the job to run every minute

const scheduler =  () => {

    nodeScheduler.scheduleJob('* * * * *', async () => {
        console.log ("Deserialising tokens now")
        await  deserialiseTokens()
     });



     nodeScheduler.scheduleJob('* * * * *', async () => {
        console.log ("sending messages now")
        await  sendNotificationToAllUsers()
     });


}


module.exports= scheduler
