const mongoose = require("mongoose");
const slugify = require("slugify");
const UpdateService= async (Request,DataModel) => {

    let ID=Request.params.id;
    const ObjectId = mongoose.Types.ObjectId;
    let UpdateQueryObject = {_id: new ObjectId(ID)};
    let PostBody=Request.body;

    try{

        let data = await DataModel.updateOne(UpdateQueryObject,PostBody);
        return {status: "success", data: data}
    }
    catch (error) {
        return {status: "fail", data: error}
    }
}
module.exports=UpdateService

