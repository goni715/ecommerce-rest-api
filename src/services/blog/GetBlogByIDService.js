const mongoose = require("mongoose");
const GetBlogByIDService= async (Request, DataModel) => {
    
    try{

        let ID=Request.params.id;
        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = {_id: new ObjectId(ID)};
        
        //Database First Process
        const UpdateViews = await DataModel.updateOne(QueryObject, {
            $inc: {numViews:1}
        })

        //Database Second Process
        let data = await DataModel.aggregate([
            {$match: QueryObject},
            {
                $lookup: {from: "users", localField: "likes", foreignField: "_id", as: "LikerDetails"}
            },
            {
                $lookup: {from: "users", localField: "dislikes", foreignField: "_id", as: "DislikerDetails"}
            }
        ])


        return {status: "success", data: data}
    }
    catch (error) {
        return {status: "fail", data: error.toString()}
    }
}
module.exports=GetBlogByIDService