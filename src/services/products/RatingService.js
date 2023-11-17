const mongoose = require("mongoose");
const RatingService= async (Request,ProductsModel) => {





    try{

        let LoginUserID=Request.headers.id;
        let Star = Request.body['star'];
        let productID = Request.body['productID'];
        let Comment = Request.body['comment'];



        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = {_id: new ObjectId(productID)};
        let product = await ProductsModel.aggregate([{$match: QueryObject}])
        let alreadyRated = product[0].ratings.find((currentValue) => currentValue.postedBy.toString() === LoginUserID.toString());


      //already Rate is Added, Now update this rating
        if(alreadyRated){
            const UpdateRating = await ProductsModel.updateOne(
                {ratings : {$elemMatch : alreadyRated}},
               {
                   $set: { "ratings.$.star": Star, "ratings.$.comment": Comment }
               }
            )
        }
        else{

            const RateProduct = await ProductsModel.updateOne(QueryObject,
                {
                    $push: {
                        ratings: {
                            star: Star,
                            comment: Comment,
                            postedBy: LoginUserID,
                        },
                    }
                }
            )

        }

        let getAllRatings =  await ProductsModel.aggregate([{$match: QueryObject}])
        let totalRating = getAllRatings[0].ratings.length;
        let ratingSum = getAllRatings[0].ratings.reduce((previousValue,currentValue)=> {
            return previousValue + currentValue.star
        },0);


        //AverageRating on One Product
        let actualRating = Math.round(ratingSum/totalRating);
        let FinalProduct = await ProductsModel.updateOne(QueryObject, {totalRating: actualRating})
        return {status: "success",data:FinalProduct}
    }
    catch (error) {

        return {status: "fail", data: error}
    }
}
module.exports=RatingService

