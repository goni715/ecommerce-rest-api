const mongoose = require("mongoose");


const DeleteUserCartService = async (Request, CartModel) => {

    try{
        let LoginUserID=Request.headers.id;
        const ObjectId = mongoose.Types.ObjectId;
        let DeleteQueryObject = {userID: new ObjectId(LoginUserID)};

        let data = await CartModel.deleteMany(DeleteQueryObject);

        return {status: "success", data: data}
    }
    catch(error) {

        return {status: "fail", data: error}
    }

}



module.exports=DeleteUserCartService