const catchAsyncError = require("../middleware/catchAsyncError");
const config = require("../config/config");
const UserDb = require("../model/user");
const jwt = require("jsonwebtoken");

exports.signupUser = catchAsyncError(async (req, res, next) => {
  const userDetail = await UserDb.findOne({ email: req.params.emailid });
  const contactList = req.query.contacts;
  let uniqueNumber = [];
  const findDublicateNumber = (numbers) => {
    numbers.forEach((element) => {
      const result = element.substring(0, 2);
      if (result == 91) {
        const num = element.split(91)[1].trim();
        if (num.length === 10 && !isNaN(num)) {
          uniqueNumber.push(parseInt(num));
        }
      } else {
        if (element.length === 10 && !isNaN(element)) {
          uniqueNumber.push(parseInt(element));
        }
      }
    });
    return [...new Set(uniqueNumber)];
  };
  if (!userDetail) {
    if (contactList?.length > 0) {
      const number = findDublicateNumber(contactList);
      if (number?.length > 0) {
        console.log(typeof number[0]);
        const createUser = await UserDb.create({
          email: req.params.emailid,
          contacts: number,
        });
        res.status(200).json({status:true,msg:createUser})
      } else {
        res
          .status(200)
          .json({ success: false, msg: "Please add your contact number" });
      }
    } else {
      res
        .status(200)
        .json({ success: false, msg: "Please add your contact number" });
    }
  } else {
    if (contactList?.length > 0) {
      const number = findDublicateNumber(contactList);
      if(number?.length > 0){
        const mergeNumber = [...userDetail.contacts,...number]
        const uniqueNumber = [...new Set(mergeNumber)]
        userDetail.contacts  = uniqueNumber;
        const result = await userDetail.save();
        res.status(200).json({status:true,msg:result})
      }else{
        res
        .status(200)
        .json({ success: false, msg: "Please add your contact number" });
      }
    }else{
      res
        .status(200)
        .json({ success: false, msg: "Please add your contact number" });
    }
  }
});
