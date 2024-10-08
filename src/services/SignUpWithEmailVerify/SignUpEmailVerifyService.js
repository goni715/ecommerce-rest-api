const SendEmailUtility = require("../../utility/SendEmailUtility");


const SignUpEmailVerifyService = async (Request,UsersModel,RegOTPModel) => {

    let Email = Request.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000)

    let UserCount = await UsersModel.aggregate([{$match:{email:Email}}, {$count: "total"} ]);


    try{

        if(UserCount.length === 0){

            // OTP Insert
            let CreateOTP = await RegOTPModel.create({email: Email, otp: OTPCode})
            // Email Send
            let SendEmail = await SendEmailUtility(Email, "Your Verification Code is= " + OTPCode, "GH Ecommerce PIN Verification");

           return {status: "success"};
        }
        else{
            return {status: "fail", data: "EmailAlreadyExist"}
        }
    }
    catch(error){

        return {status: "fail", data: error};
    }

}

module.exports=SignUpEmailVerifyService






//SignUpUser Email Verify--Step-01//OTP-Send
/*exports.SignUpEmailVerify = async (req,res)=>{

    let Email = req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000)

    let UserCount = await UsersModel.aggregate([{$match:{email:Email}}, {$count: "total"} ]);


    try{

        if(UserCount.length === 0){

            // OTP Insert
            let CreateOTP = await RegOTPModel.create({email: Email, otp: OTPCode})
            // Email Send
            let SendEmail = await SendEmailUtility(Email, "Your Verification Code is= " + OTPCode, "Task Manager PIN Verification");

            res.status(200).json({status: "success", data: SendEmail})

            //res.status(200).json({status: "success", data: "User New"})

        }
        else{

            res.status(200).json({status: "fail", data: "EmailAlreadyExist"})

        }

    }
    catch(error){

        res.status(200).json({status: "fail", data: error});

    }


}*/



