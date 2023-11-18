const express = require('express');
const app = new express();
const UsersModel = require("../../models/Users/UsersModel");
const CartModel = require("../../models/Cart/CartModel");
const OrderModel = require("../../models/Order/OrderModel");
const ProductsModel = require("../../models/Products/ProductsModel");
const GetOrderByUserIDService = require("../../services/order/GetOrderByUserIDService");
const GetAllOrderService = require("../../services/order/GetAllOrderService");
const UpdateOrderStatusService = require("../../services/order/UpdateOrderStatusService");
const GetMonthWiseOrderIncomeService = require("../../services/order/GetMonthWiseOrderIncomeService");
const GetMonthWiseOrderCountService = require("../../services/order/GetMonthWiseOrderCountService");
const GetYearlyTotalOrdersService = require("../../services/order/GetYearlyTotalOrdersService");
const GetSingleOrderService = require("../../services/order/GetSingleOrderService");
const DeleteService = require("../../services/common/DeleteService");
const CreateOrderWithPaymentService = require("../../services/order/CreateOrderWithPaymentService");


exports.GetOrderByUser=async (req, res) => {
    let Result=await GetOrderByUserIDService(req, OrderModel)
    res.status(200).json(Result)
}

exports.GetSingleOrder=async (req, res) => {
    let Result=await GetSingleOrderService(req, OrderModel)
    res.status(200).json(Result)
}


exports.GetAllOrders=async (req, res) => {
    let Result=await GetAllOrderService(req, OrderModel)
    res.status(200).json(Result)
}


exports.UpdateOrderStatus=async (req, res) => {
    let Result=await UpdateOrderStatusService(req, OrderModel)
    res.status(200).json(Result)
}



exports.DeleteOrder=async(req,res)=>{
    let Result=await DeleteService(req,OrderModel);
    res.status(200).json(Result)
}




/*-------------------------------------------Order Part-----------------------------------------------------------------*/
exports.CreateOrderWithPayment=async (req, res) => {
    let Result=await CreateOrderWithPaymentService(req,OrderModel);
    res.status(200).json(Result)
}




exports.PaymentSuccess=async (req, res) => {
    //console.log(req.params.tranId);
    try{
        let result = await OrderModel.updateOne({ transactionID:req.params.tranId},
            {paidStatus: true});

        if(result.modifiedCount > 0){
            res.redirect("https://mern-ecommerce-goni.netlify.app/#/payment/success/"+req.params.tranId);
        }
    }
    catch (error) {
        res.status(200).json({status: "fail", error: error});
    }

}





exports.PaymentFail=async (req, res) => {
    //console.log(req.params.tranId);
    try{
        let result = await OrderModel.deleteOne({ transactionID:req.params.tranId});
        if(result.deletedCount > 0){
            res.redirect("https://mern-ecommerce-goni.netlify.app/#/payment/fail/"+req.params.tranId);
        }
    }
    catch (error) {
        res.status(200).json({status: "fail", error: error});
    }
}





//কোন মাসে কত Income
exports.getMonthWiseOrderIncome=async (req, res) => {
    let Result=await GetMonthWiseOrderIncomeService(req, OrderModel)
    res.status(200).json(Result)

}






///কোন মাসে কয়টা  Order পরছে
exports.getMonthWiseOrderCount=async (req, res) => {
    let Result=await GetMonthWiseOrderCountService(req, OrderModel)
    res.status(200).json(Result)
}









///এক বছ্রে Total Order & Total Income
exports.getYearlyTotalOrders=async (req, res) => {
    let Result=await GetYearlyTotalOrdersService(req, OrderModel)
    res.status(200).json(Result)
}












