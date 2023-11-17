const mongoose = require("mongoose");


const GetSingleOrderService = async (Request, OrderModel) => {




    try {
        let ID=Request.params.id;
        const ObjectId = mongoose.Types.ObjectId;


        const orderData = await OrderModel.aggregate([
            {$match: {_id: new ObjectId(ID)}},
            {
                $lookup: {from: "products", localField: "orderItems.ProductID", foreignField: "_id", as: "products"}
            },
            {
                $lookup: {from: "brands", localField: "products.BrandID", foreignField: "_id", as: "Brand"}
            },
            {
                $lookup: {from: "colors", localField: "products.color", foreignField: "_id", as: "Colors"}
            },

        ])








   //Get Color Name
         await orderData[0]['orderItems'].forEach((item, i) => {
                let result = orderData[0]['Colors'].find((currentValue) => currentValue._id.toString() === orderData[0]['orderItems'][i].color.toString());
                if (result._id.toString() === orderData[0]['orderItems'][i].color.toString()) {
                    item.ColorName = result.ColorName;
                }
            })




   //Get Brand Name
        await orderData[0]['products'].forEach((item,i)=>{
            let result = orderData[0]['Brand'].find((currentValue)=>currentValue._id.toString() === orderData[0]['products'][i].BrandID.toString());
            if(result._id.toString() === orderData[0]['products'][i].BrandID.toString() ){
                item.BrandName=result.BrandName;
            }
        })






  //Get Product Name, Price, BrandName
        for (let x = 0; x < orderData.length; x++) {

            await orderData[x]['orderItems'].forEach((item, i) => {
                let result = orderData[x]['products'].find((currentValue) => currentValue._id.toString() === orderData[x]['orderItems'][i].ProductID.toString());
                if (result._id.toString() === orderData[x]['orderItems'][i].ProductID.toString()) {
                    item.ProductName = result.ProductName;
                    item.price = result.price;
                    item.BrandName=result.BrandName;
                }
            })

        }








        return {status:"success", data:orderData};

    }
    catch (error) {

        return {status:"fail", data:error};
    }
}

module.exports=GetSingleOrderService