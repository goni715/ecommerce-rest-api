const mongoose = require("mongoose");
const slugify = require("slugify");
const UpdateProductService= async (Request,DataModel) => {



    try{

        let ID=Request.params.id;
        const ObjectId = mongoose.Types.ObjectId;
        let UpdateQueryObject = {_id: new ObjectId(ID)};
        let PostBody=Request.body;






        if(PostBody.ProductName){
            PostBody.slug=slugify(PostBody.ProductName);
        }

        let data = await DataModel.updateOne(UpdateQueryObject,PostBody);
        return {status: "success", data: data}
    }
    catch (error) {
        return {status: "fail", data: error}
    }
}
module.exports=UpdateProductService

