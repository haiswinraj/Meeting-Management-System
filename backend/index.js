const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv')
const meetingRoute = require("./routes/meeting");
const authRoute = require("./routes/auth");
const cors = require("cors");
var http = require('http');

var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());


dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successful"))
    .catch((err) => {
        console.log(err);
    })

    console.log("sddd");

app.use(express.json());

app.use("/api/meeting", meetingRoute);
app.use("/api/auth", authRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
});


