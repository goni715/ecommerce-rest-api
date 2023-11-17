const CreateService = require("../../services/common/CreateService");
const CouponModel = require("../../models/Coupon/CouponModel");
const UpdateService = require("../../services/common/UpdateService");
const DeleteService = require("../../services/common/DeleteService");
const DetailsByIDService = require("../../services/common/DetailsByIDService");
const GetAllService = require("../../services/common/GetAllService");


exports.CreateCoupon=async (req, res) => {
    let Result=await CreateService(req,CouponModel);
    res.status(200).json(Result)
}

exports.UpdateCoupon=async(req,res)=>{
    let Result=await UpdateService(req,CouponModel)
    res.status(200).json(Result)
}


exports.DeleteCoupon=async(req,res)=>{
    let Result=await DeleteService(req,CouponModel)
    res.status(200).json(Result)
}


exports.GetCoupon=async (req, res) => {
    let Result=await DetailsByIDService(req,CouponModel);
    res.status(200).json(Result)
}

exports.GetAllCoupons=async(req,res)=>{
    let Projection = {$project:{_id:1, name:1, expiry:1, discount:1}};
    let Result=await GetAllService(req,CouponModel,Projection)
    res.status(200).json(Result)
}

