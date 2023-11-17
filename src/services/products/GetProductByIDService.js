const mongoose = require("mongoose");
const GetProductByIDService= async (Request,DataModel) => {

    try{

        let ID=Request.params.id;
        const ObjectId = mongoose.Types.ObjectId;
        let DetailsQueryObject = {_id: new ObjectId(ID)};

        let JoinStage1={$lookup: {from: "brands", localField: "BrandID", foreignField: "_id", as: "Brand"}};
        let JoinStage2= {$lookup: {from: "productcategories", localField: "CategoryID", foreignField: "_id", as: "Category"}};
        let JoinStage3= {$lookup: {from: "colors", localField: "color", foreignField: "_id", as: "Colors"}};
        let JoinStage4= {$lookup: {from: "users", localField: "ratings.postedBy", foreignField: "_id", as: "RatingsBy"}};

        let product = await DataModel.aggregate([
            {$match: DetailsQueryObject},
            JoinStage1, JoinStage2, JoinStage3, JoinStage4
        ])



        let ratings = product[0]['ratings'];
        let RatingsBy = product[0]['RatingsBy'];

        ratings.forEach((item,i)=>{
            let result = RatingsBy.find((currentValue)=>currentValue._id.toString() === ratings[i].postedBy.toString());
            if(result._id.toString() === ratings[i].postedBy.toString() ){
                item.firstName=result.firstName;
                item.lastName=result.lastName;
            }
        })





        return {status: "success", data: product}
    }
    catch (error) {
        return {status: "fail", data: error.toString()}
    }
}
module.exports=GetProductByIDService