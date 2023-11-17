const mongoose = require("mongoose");


const AddToCartService = async (Request, CartModel) => {


     try{
         let LoginUserID=Request.headers.id;
         let PostBody = Request.body;
         PostBody.userID=LoginUserID;

         let data = await CartModel.create(PostBody);


         return {status: "success", data: data}
     }
     catch(error) {

         return {status: "fail", data: error}
     }

}



module.exports=AddToCartService