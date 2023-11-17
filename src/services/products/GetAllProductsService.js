
const GetAllProductsService= async (Request,DataModel) => {


    try {

        let searchValue = Request.params.searchKeyword;
        let data;


      if(searchValue !== "0") {


          let SearchRgx = {"$regex": searchValue, "$options": "i"}
          let SearchQuery = {$or: [{brand: SearchRgx}, {category: SearchRgx}, {color: SearchRgx}]}

          data = await DataModel.aggregate([{
              $facet:{
                  Total:[{$match: SearchQuery},{$count: "count"}],
                  Rows:[{$match: SearchQuery}],
              }
          }])


      }else{

          let JoinStage1={$lookup: {from: "brands", localField: "BrandID", foreignField: "_id", as: "Brand"}};
          let JoinStage2= {$lookup: {from: "productcategories", localField: "CategoryID", foreignField: "_id", as: "Category"}};
          let JoinStage3= {$lookup: {from: "colors", localField: "color", foreignField: "_id", as: "Colors"}};
          let JoinStage4= {$lookup: {from: "users", localField: "ratings.postedBy", foreignField: "_id", as: "RatingsBy"}};


          data =await DataModel.aggregate([
             JoinStage1,
             JoinStage2,
             JoinStage3,
             JoinStage4
          ]);


      }


        return  {status: "success", data: data}


    } catch (error) {
        return {status: "fail", data: error}
    }
}
module.exports=GetAllProductsService