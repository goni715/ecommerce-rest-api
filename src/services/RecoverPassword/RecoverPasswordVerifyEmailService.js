const OTPSModel = require("../../models/Users/OTPSModel");
const ResetTokenModel = require("../../models/Users/ResetTokenModel");
const SendEmailUtilityTwo = require("../../utility/SendEmailUtilityTwo");
const crypto = require("crypto");


const RecoverPasswordVerifyEmailService = async (Request, DataModel) => {
    try {
        // Email Account Query
        let email = Request.params.email;
        const Token = crypto.randomBytes(32).toString("hex");


        // Database First process
        let UserCount = (await DataModel.aggregate([{$match: {email: email}}]))

        if(UserCount.length>0){
            // Token Insert
            // Database Second process
            await ResetTokenModel.create({email: email, token:Token})

            const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='https://mern-ecommerce-goni.netlify.app/reset-password/${email}/${Token}'>Click Here</>`;


            // Email Send
            let SendEmail = await SendEmailUtilityTwo(email,"Hey User","Ecommerce MERN", resetURL)

            return {status: "success", data: SendEmail}
        }
        else{
            return {status: "fail", data: "NoUserFound"}
        }
    }catch (error) {

        return {status: "fail", data: error.toString()}
    }
}
module.exports=RecoverPasswordVerifyEmailService