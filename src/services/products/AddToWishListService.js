const mongoose = require("mongoose");
const AddToWishListService= async (Request, UsersModel) => {



    try{
        let productID=Request.body['productID'];
        let LoginUserID=Request.headers.id;
        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = {_id: new ObjectId(LoginUserID)};
        let UserData = await UsersModel.aggregate([{$match: QueryObject}])

        const wishlist = UserData[0].wishlist;
         let alreadyAdded = wishlist.find((currentValue)=>currentValue.toString() === productID.toString());

  //If this productID is not added to wishlist, add this ProductID
         if(!alreadyAdded){
              let UpdateData = await UsersModel.updateOne(QueryObject, {
                 $push: { wishlist: productID }
              })

             let user = await UsersModel.aggregate([{$match: QueryObject}])
             return {status: "success", result:"Product is Added Wishlist", data: user}

        }else{
              let user = await UsersModel.aggregate([{$match: QueryObject}])
              return {status: "success", result:"Product is already Added Wishlist", data: user}
        }




        /*
        if(alreadyAdded){
            let UpdateData = await UsersModel.updateOne(QueryObject, {
                $pull: { wishlist: productID }
            })
            let UserData = await UsersModel.aggregate([{$match: QueryObject}])

            return {status: "success", data: UserData}
        }
        else{
            let UpdateData = await UsersModel.updateOne(QueryObject, {
                $push: { wishlist: productID }
            })
            let UserData = await UsersModel.aggregate([{$match: QueryObject}])
            return {status: "success", data: UserData}
        }
         */



    }
    catch (error) {
        return {status: "fail", data: error}
    }
}
module.exports=AddToWishListService

