const mongoose = require("mongoose");
const RemoveWishListService= async (Request, UsersModel) => {



    try{

        let productID=Request.body['productID'];

        let LoginUserID=Request.headers.id;
        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = {_id: new ObjectId(LoginUserID)};
        let UserData = await UsersModel.aggregate([{$match: QueryObject}])
        const wishlist = UserData[0].wishlist;

        let alreadyAdded = wishlist.find((currentValue)=>currentValue.toString() === productID.toString());
        //If this productID has been already added to wishlist, remove this ProductID
          if(alreadyAdded){
               let UpdateData = await UsersModel.updateOne(QueryObject, {
                     $pull: { wishlist: productID }
               })

              let user = await UsersModel.aggregate([
                  {$match: QueryObject},
                  {$lookup: {from: "products", localField: "wishlist", foreignField: "_id", as: "WishlistDetails"}}
              ])

              return {status: "success", data: user}

         }else{
              let user = await UsersModel.aggregate([
                  {$match: QueryObject},
                  {$lookup: {from: "products", localField: "wishlist", foreignField: "_id", as: "WishlistDetails"}}
              ])
              return {status: "success", data: user}
          }


    }
    catch (error) {
        return {status: "fail", data: error}
    }
}
module.exports=RemoveWishListService

