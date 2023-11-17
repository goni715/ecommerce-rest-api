const mongoose = require("mongoose");


const GetOrderByUserIDService = async (Request, OrderModel) => {




    try {
        let LoginUserID=Request.headers.id;
        const ObjectId = mongoose.Types.ObjectId;


        const orderData = await OrderModel.aggregate([
            {$match: {user: new ObjectId(LoginUserID)}},
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




    //Get ProductName & Price
        for (let x = 0; x < orderData.length; x++) {

            await orderData[x]['orderItems'].forEach((item, i) => {
                let result = orderData[x]['products'].find((currentValue) => currentValue._id.toString() === orderData[x]['orderItems'][i].ProductID.toString());
                if (result._id.toString() === orderData[x]['orderItems'][i].ProductID.toString()) {
                    item.ProductName = result.ProductName;
                    item.price = result.price;
                }
            })

        }



        //Get Color Name
        for (let n = 0; n < orderData.length; n++) {

            await orderData[n]['orderItems'].forEach((item, i) => {
                let result = orderData[n]['Colors'].find((currentValue) => currentValue._id.toString() === orderData[n]['orderItems'][i].color.toString());
                if (result._id.toString() === orderData[n]['orderItems'][i].color.toString()) {
                    item.ColorName = result.ColorName;
                }
            })

        }



        return {status:"success", data:orderData};

    }
    catch (error) {

        return {status:"fail", data:error};
    }
}

module.exports=GetOrderByUserIDService