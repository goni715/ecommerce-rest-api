const mongoose = require("mongoose");
const DetailsByIDService= async (Request,DataModel) => {
    
    try{

        let ID=Request.params.id;
        const ObjectId = mongoose.Types.ObjectId;
        let DetailsQueryObject = {_id: new ObjectId(ID)};
        
        let data = await DataModel.aggregate([{$match: DetailsQueryObject}])
        return {status: "success", data: data}
    }
    catch (error) {
        return {status: "fail", data: error.toString()}
    }
}
module.exports=DetailsByIDService