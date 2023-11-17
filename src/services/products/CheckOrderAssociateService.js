const mongoose = require("mongoose");
const CheckOrderAssociateService= async (Request, OrderModel) => {


    try{

        let DeleteID=Request.params.id;

        let orders = await OrderModel.aggregate([
            {$project:{_id:1, orderItems:1}}
        ]);


       let alreadyUsed;


        for(let i=0; i < orders.length; i++){
           if(orders[i]['orderItems'].find((currentValue) => currentValue.ProductID.toString() === DeleteID.toString())){
              alreadyUsed = orders[i]['orderItems'].find((currentValue) => currentValue.ProductID.toString() === DeleteID.toString())
           }
        }


        return alreadyUsed;

    }
    catch (error) {
        return false
    }
}
module.exports=CheckOrderAssociateService