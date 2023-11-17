const ProductCategoryModel = require("../../models/ProductCategory/ProductCategoryModel");
const mongoose = require("mongoose");

const FilterProductsService= async (Request,DataModel) => {



    try {


        const ObjectId = mongoose.Types.ObjectId;


        let SearchValue = Request.params.searchValue;
        let letterSorting = Number(Request.params.letter);
        let priceSorting = Number(Request.params.price);
        let dateSorting = Number(Request.params.date);
        let Category = Request.params.category;
        let FromPrice = Number(Request.params.fromPrice);
        let ToPrice = Number(Request.params.toPrice);
        let CheckEmpty = Request.params.empty;


        let JoinStage1={$lookup: {from: "brands", localField: "BrandID", foreignField: "_id", as: "Brand"}};
        let JoinStage2= {$lookup: {from: "productcategories", localField: "CategoryID", foreignField: "_id", as: "Category"}};
        let JoinStage3= {$lookup: {from: "colors", localField: "color", foreignField: "_id", as: "Colors"}};




        let data;

        if(CheckEmpty === "empty") {
            data = await DataModel.aggregate([
               JoinStage1, JoinStage2, JoinStage3
            ])
        }
        else if(SearchValue !== "0") {

            let SearchRgx = {"$regex": SearchValue, "$options": "i"}
            let SearchQuery = {$or: [{brand: SearchRgx}, {category: SearchRgx}, {color: SearchRgx}, {description:SearchRgx}]}

            data = await DataModel.aggregate([{
                $facet:{
                    Total:[{$match: SearchQuery},{$count: "count"}],
                    Rows:[{$match: SearchQuery}],
                }
            }])
        }
        else if(letterSorting !== 0){
            data = await DataModel.aggregate([
                {$sort : { ProductName: letterSorting }},
                JoinStage1, JoinStage2, JoinStage3
            ])
        }
        else if(FromPrice !== 0 ){
            data = await DataModel.aggregate([
                {$match : { price: {$gte: FromPrice, $lte: ToPrice}}},
                {$sort : { price : 1 }},
                JoinStage1, JoinStage2, JoinStage3
            ])
        }
        else if(priceSorting !== 0){
            data = await DataModel.aggregate([
                {$sort : { price: priceSorting }},
                JoinStage1, JoinStage2, JoinStage3
            ])
        }
        else if(dateSorting !== 0){
            data = await DataModel.aggregate([
                {$sort : { createdAt: dateSorting }},
                JoinStage1, JoinStage2, JoinStage3
            ])
        }
        else if(Category !== 0){
            let categories =await ProductCategoryModel.aggregate([{$project:{_id:1, CategoryName:1}}]);
            let result = categories.find((currentValue)=>currentValue.CategoryName === Category);
            data = await DataModel.aggregate([
                {$match : {CategoryID: new ObjectId(result._id)}},
                JoinStage1, JoinStage2, JoinStage3
            ])
        }




        return  {status: "success", data: data}


    } catch (error) {
        return {status: "fail", data: error}
    }
}
module.exports=FilterProductsService