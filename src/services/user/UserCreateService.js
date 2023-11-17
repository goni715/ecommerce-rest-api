const bcrypt = require("bcrypt");
const UserCreateService= async (Request,DataModel) => {
    try{
        let PostBody=Request.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(PostBody.password, salt);
        PostBody.password = hashedPassword;

        let data = await DataModel.create(PostBody)
        return {status: "success", data: data}
    }
    catch (error) {
        return {status: "EmailAlreadyExist", data: error}
    }
}
module.exports=UserCreateService