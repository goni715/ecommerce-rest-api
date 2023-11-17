const CreateToken = require("../../utility/CreateToken");
const bcrypt = require("bcrypt");

const UserLoginService= async (Request, res, DataModel) => {

    try {
        //const { username, password } = req.body;
        let email = Request.body.email;
        let password = Request.body.password;

        let data =await DataModel.aggregate([{$match:{email:email}}])

       if(data.length>0) {
            const CheckPassword = await bcrypt.compare(password, data[0].password);
            //if password is not matching
            if (!CheckPassword) {
                return { status: "fail", data:"Wrong Password!"};
            } else {

                let TokenData = {
                    email: data[0].email,
                    id: data[0]._id
                }

                let token = await CreateToken(TokenData);

                let update = await DataModel.updateOne({email:email},{refreshToken:token})
                let userData =await DataModel.aggregate([{$match:{email:email}}])

                res.cookie("refreshToken", token, {httpOnly:true, maxAge: 72 * 60 * 60 * 1000})

                return {status:"success",token:token, data:userData[0]}
            }
        } else {
           return { status: "fail", data:"Could not Find this Email!"};
        }

    }
    catch (error) {
        return {status: "error", data: error.toString()}
    }
}
module.exports=UserLoginService