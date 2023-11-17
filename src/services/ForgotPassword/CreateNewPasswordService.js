const OTPSModel = require("../../models/Users/OTPSModel");
const UsersModel = require("../../models/Users/UsersModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const CreateNewPasswordService= async (Request,UsersModel,OTPSModel) => {
    let email = Request.body['email'];
    let OTPCode = Request.body['otp'];
    let NewPassword =  Request.body['password'];
    let statusUpdate=1;

    try {

        // Database First Process
          let OTPUsedCount = await OTPSModel.aggregate([{$match: {email: email, otp: OTPCode, status: statusUpdate}}]);

          if(OTPUsedCount.length > 0){

              const salt = await bcrypt.genSalt(10);
              const hashedPassword = await bcrypt.hash(NewPassword, salt);
              //Database Second Process
              let PasswordUpdate = await UsersModel.updateOne({email: email},{password: hashedPassword})
              return {status: "success", data: PasswordUpdate}
          }
          else{
            return {status: "fail", data: "InvalidOtpCode"}
          }

    }


    catch (e) {
        return {status: "fail", data: error}
    }
}
module.exports=CreateNewPasswordService