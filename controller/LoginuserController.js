const catchAsyncError = require("../middleware/catchAsyncError");
const config = require("../config/config");
const UserDb = require("../model/user");
const jwt = require("jsonwebtoken");

exports.signupUser = catchAsyncError(async (req, res, next) => {
  console.log(req.params.emailid)
  console.log(req.query.contacts)
  const userDetail = await UserDb.findOne({ email: req.params.emailid });
  if(!userDetail){
    const numbers = req.query.contacts
    let uniqueNumber = []
    numbers.forEach(element => {
      const result = element.substring(0,2);
      if(result == 91){
         const num = element.split(91)[1].trim();
         uniqueNumber.push(num);
      }else{
        uniqueNumber.push(element);
      }
    });
    console.log(uniqueNumber) 
  }else{

  }
  // if (!emiDetail) {
  //   const userData = await UserDb.create({
  //     email: req.body.email,
  //     password: req.body.password,
  //   });
  //   res.status(200).json({
  //     success: true,
  //     msg: userData,
  //   });
  // } else {
  //   res.status(200).json({
  //     success: false,
  //     msg: "This email already has an account",
  //   });
  // }
});
