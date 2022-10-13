const express = require("express");
const app = express();
app.use(express.json());
var cors = require("cors");
app.use(cors());

const Login = require("./routes/Login_Route")

app.use("/",Login)

module.exports = app;
