const express = require("express");
const app = express();
const mongoose = require("mongoose")
const cors = require("cors") 

app.options("*", cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(express.json())
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");

const connectionString = `mongodb+srv://${process.env.CONNECTION_STRING_USERNAME}:${process.env.CONNECTION_STRING_PASSWORD}@ducoin.ineojs0.mongodb.net/DUCEARN`;
mongoose.connect(connectionString,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log("mongoose Connected successfully");
    })
    .catch((error)=>{
        console.log(error);
    })

//Define Routes here    
app.use('/api/auth/', authRoutes)
app.use('/api/user/', userRoutes)
//START SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`[SERVER STARTED] Listening to port [${port}]`);
});

module.exports = server;