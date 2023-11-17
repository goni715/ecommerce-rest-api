
const GetAllBlogsService= async (Request, DataModel) => {

    try {
          let JoinStage2= {$lookup: {from: "blogcategories", localField: "CategoryID", foreignField: "_id", as: "Category"}};
         let  data =await DataModel.aggregate([
             JoinStage2
          ]);

        return  {status: "success", data: data}

    } catch (error) {
        return {status: "fail", data: error}
    }
}
module.exports=GetAllBlogsService