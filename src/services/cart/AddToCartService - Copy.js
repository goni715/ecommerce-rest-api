const mongoose = require("mongoose");
const ProductsModel = require("../../models/Products/ProductsModel");
const CartModel = require("../../models/Cart/CartModel");


const AddToCartService = async (Request, UsersModel) => {

    // Create Transaction Session
    const session = await mongoose.startSession();

    

     try{

         let LoginUserID=Request.headers.id;
         const ObjectId = mongoose.Types.ObjectId;
         let QueryObject = {_id: new ObjectId(LoginUserID)};


         let Products = Request.body['products'];
         let user = await UsersModel.aggregate([{$match: QueryObject}])
         //check if user already have product in cart
        const alreadyExistCart = await CartModel.aggregate([
            {
                $match: {orderBy: new ObjectId(LoginUserID)}
            }
        ])


         for (let i = 0; i < Products.length; i++) {
             let ProductDetails = await ProductsModel.aggregate([{$match: {_id: new ObjectId(Products[i].ProductID)}}])
             Products[i].price = ProductDetails[0].price;
         }

         const totalPrice = Products.reduce((previousValue,currentValue)=>{
             return previousValue + (currentValue.count * currentValue.price)
         },0)

         let PostBody = {
             products: Products,
             cartTotal: totalPrice,
             orderBy: LoginUserID
         }


        let data;

         if(alreadyExistCart){
             // Begin Transaction
             await session.startTransaction();

             let alreadyExistCartRemove = await CartModel.deleteOne({orderBy: new ObjectId(LoginUserID)},{session});
              data = await CartModel.create([PostBody], {session});

             // Transaction Success
             await session.commitTransaction();
             await session.endSession();

         }else{
              data = await CartModel.create(PostBody);
         }

         return {status: "success", data: data}
     }
     catch(error) {
         // Roll Back Transaction if Fail
         await session.abortTransaction();
         await session.endSession();
         return {status: "fail", data: error.toString()}
     }

}



module.exports=AddToCartService