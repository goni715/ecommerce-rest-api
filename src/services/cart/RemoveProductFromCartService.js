const mongoose = require("mongoose");


const RemoveProductFromCartService = async (Request, CartModel) => {


    try{

        let LoginUserID=Request.headers.id;
        let cartItemID = Request.body['cartItemID']
        const ObjectId = mongoose.Types.ObjectId;
        let DeleteQueryObject = {userID: new ObjectId(LoginUserID), _id: new ObjectId(cartItemID)};



        let DeleteProductFromCart = await CartModel.deleteOne(DeleteQueryObject);
        return {status: "success", data: DeleteProductFromCart}
    }
    catch (error) {
        return {status: "fail", data: error.toString()}
    }

}

module.exports=RemoveProductFromCartService