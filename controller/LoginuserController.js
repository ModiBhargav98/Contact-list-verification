const catchAsyncError = require("../middleware/catchAsyncError");
const config = require("../config/config");
const UserDb = require("../model/user");
const jwt = require("jsonwebtoken");

exports.signupUser = catchAsyncError(async (req, res, next) => {
  console.log(req.params.emailid);
  console.log(req.query.contacts);
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
        console.log(createUser);
      } else {
        res
          .status(200)
          .json({ success: true, msg: "Please add your contact number" });
      }
    } else {
      res
        .status(200)
        .json({ success: true, msg: "Please add your contact number" });
    }
  } else {
    if (contactList?.length > 0) {
      const number = findDublicateNumber(contactList);
      if(number?.length > 0){
        const mergeNumber = [...userDetail.contacts,...number]
        const uniqueNumber = [...new Set(mergeNumber)]
        console.log(uniqueNumber)
      }else{
        res
        .status(200)
        .json({ success: true, msg: "Please add your contact number" });
      }
    }else{
      res
        .status(200)
        .json({ success: true, msg: "Please add your contact number" });
    }
  }
});
