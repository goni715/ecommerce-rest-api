const mongoose = require("mongoose");


const GetUserCartService = async (Request, CartModel ) => {


    try{

        let LoginUserID=Request.headers.id;
        const ObjectId = mongoose.Types.ObjectId;

        const cartData = await CartModel.aggregate([
            {$match: {userID: new ObjectId(LoginUserID)}},
            {$lookup: {from: "products", localField: "ProductID", foreignField: "_id", as: "ProductDetails"}},
            {$lookup: {from: "colors", localField: "ColorID", foreignField: "_id", as: "Colors"}}
        ])
        

        return {status: "success", data:cartData}
    }
    catch(error) {

        return {status: "fail", data: error.toString()}
    }

}

module.exports=GetUserCartService