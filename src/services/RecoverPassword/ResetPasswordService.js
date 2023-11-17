const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const ResetPasswordService= async (Request, UsersModel,ResetTokenModel) => {

    // Create Transaction Session
    const session = await mongoose.startSession();

    try {
        let Token = Request.params.token;
        let Email = Request.body['email'];
        let NewPassword =  Request.body['newPassword'];
        let status=0;
        let statusUpdate=1;


        //Database First Process
        let TokenUsedCount = await ResetTokenModel.aggregate([
            {$match: {email:Email, token: Token, status: status, tokenExpires: {$gt: new Date(Date.now()) } }}
        ]);



        if (TokenUsedCount.length>0) {

            // Begin Transaction
            await session.startTransaction();

            // Second Database Process//Data Change
            let TokenUpdate = await ResetTokenModel.updateOne({email:Email, token: Token, status: status}, {email:Email, token: Token, status: statusUpdate}, {session})


            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(NewPassword, salt);

            //Third Database Process//Data Change
            let PasswordUpdate = await UsersModel.updateOne({email: Email},{password: hashedPassword}, {session})

            // Transaction Success
            await session.commitTransaction();
            await session.endSession();

            return {status: "success", data: PasswordUpdate}

        } else {
            await session.endSession();
            return  {status: "fail", data: "InvalidLink"}
        }
    }
    catch (error) {
        // Roll Back Transaction if Fail
        await session.abortTransaction();
        await session.endSession();
        return {status: "fail", data: error.toString()}
    }
}
module.exports=ResetPasswordService