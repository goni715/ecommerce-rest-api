const mongoose = require("mongoose");
const DeleteService= async (Request, Model) => {


    try{

        let ID=Request.params.id;
        const ObjectId = mongoose.Types.ObjectId;
        let DeleteQueryObject = {_id: new ObjectId(ID)};

        let Delete =  await Model.deleteOne(DeleteQueryObject)

        return {status: "success",Delete:Delete}
    }
    catch (error) {
        return {status: "fail", data: error.toString()}
    }
}
module.exports=DeleteService