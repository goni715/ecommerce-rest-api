const mongoose = require("mongoose");


const GetAllOrderService = async (Request, OrderModel) => {


    try{

        const orderData = await OrderModel.aggregate([
            {
                $lookup: {from: "users", localField: "user", foreignField: "_id", as: "customer"}
            },
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
        return {status:"success", data: orderData};
    }
    catch (error) {

        return {status:"fail", data:error};
    }
}

module.exports=GetAllOrderService