const mongoose = require("mongoose");


const UpdateOrderStatusService = async (Request, OrderModel) => {


    try{

        let ID=Request.params.id;
        const ObjectId = mongoose.Types.ObjectId;
        let UpdateQueryObject = {_id: new ObjectId(ID)};
        let Status = Request.body['orderStatus'];


        const updateOrderStatus = await OrderModel.updateOne(UpdateQueryObject,
            {
                orderStatus: Status,
            }
        )
        return {status:"success", data: updateOrderStatus};
    }
    catch (error) {

        return {status:"fail", data:error};
    }
}

module.exports=UpdateOrderStatusService