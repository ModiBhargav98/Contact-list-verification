const express = require("express");
// const passport = require("passport");
const { loginUser, signupUser } = require("../controller/LoginuserController");
const {authentication} = require("../middleware/auth")
const userRouter = express.Router();

// pass the route authentication middleware and this api access token based
userRouter.get("/verifycontact/:emailid", signupUser);

module.exports = userRouter;
