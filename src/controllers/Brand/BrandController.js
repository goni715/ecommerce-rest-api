const CreateService = require("../../services/common/CreateService");
const BrandModel = require("../../models/Brand/BrandModel");
const DeleteService = require("../../services/common/DeleteService");
const DetailsByIDService = require("../../services/common/DetailsByIDService");
const GetAllService = require("../../services/common/GetAllService");
const UpdateService = require("../../services/common/UpdateService");
const ProductsModel = require("../../models/Products/ProductsModel");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const mongoose = require("mongoose");


exports.CreateBrand=async (req, res) => {
    let Result=await CreateService(req,BrandModel);
    res.status(200).json(Result)
}


exports.UpdateBrand=async(req,res)=>{
    let Result=await UpdateService(req,BrandModel)
    res.status(200).json(Result)
}


exports.GetBrand=async (req, res) => {
    let Result=await DetailsByIDService(req,BrandModel);
    res.status(200).json(Result)
}

exports.GetAllBrand=async(req,res)=>{
    let Projection = {$project:{_id:1, BrandName:1}};
    let Result=await GetAllService(req,BrandModel,Projection)
    res.status(200).json(Result)
}


exports.DeleteBrand=async (req, res) => {
    let DeleteID=req.params.id;
    const ObjectId = mongoose.Types.ObjectId;
    let CheckAssociate= await CheckAssociateService({BrandID: new ObjectId(DeleteID)},ProductsModel);

    if(CheckAssociate){
        res.status(200).json({status: "associate", data: "associated with Product"})
    }
    else{
        let Result=await DeleteService(req,BrandModel);
        res.status(200).json(Result)
    }
}

