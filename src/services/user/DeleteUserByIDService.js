const mongoose = require("mongoose");
const DeleteUserByIDService = async (Request, Model) => {

    try{
        let DeleteID=Request.params.id;
       // let userEmail=Request.headers['email'];

        const ObjectId = mongoose.Types.ObjectId;

        let DeleteQueryObject = {_id: new ObjectId(DeleteID)};

        let Delete =  await Model.deleteOne(DeleteQueryObject)

        return {status: "success",Delete:Delete}

    }
    catch (error) {
        return {status: "fail", data: error.toString()}
    }
}
module.exports=DeleteUserByIDService