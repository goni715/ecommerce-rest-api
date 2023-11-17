const mongoose = require("mongoose");
const GetUserDetailsByIDService= async (Request, DataModel) => {


    let LoginUserID=Request.headers.id;
    const ObjectId = mongoose.Types.ObjectId;
    let QueryObject = {_id: new ObjectId(LoginUserID)};

    try {
        let data = await DataModel.aggregate([{$match: QueryObject}])
        return  {status: "success", data: data}
    } catch (error) {
        return {status: "fail", data: error}
    }



}
module.exports=GetUserDetailsByIDService