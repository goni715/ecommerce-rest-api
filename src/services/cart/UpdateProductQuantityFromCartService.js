const mongoose = require("mongoose");


const UpdateProductQuantityFromCartService = async (Request, CartModel) => {



    try{


        let LoginUserID=Request.headers.id;
        let cartItemID = Request.body['cartItemID']
        let Quantity = Request.body['quantity']
        const ObjectId = mongoose.Types.ObjectId;
        let UpdateQuery = {userID: new ObjectId(LoginUserID), _id: new ObjectId(cartItemID)};


        let UpdateProductFromCart = await CartModel.updateOne(UpdateQuery,
            {quantity: Quantity});
        return {status: "success", data: UpdateProductFromCart}
    }
    catch (error) {
        return {status: "fail", data: error.toString()}
    }

}

module.exports=UpdateProductQuantityFromCartService