const ColorModel = require("../../models/Color/ColorModel");
const CreateService = require("../../services/common/CreateService");
const DeleteService = require("../../services/common/DeleteService");
const DetailsByIDService = require("../../services/common/DetailsByIDService");
const GetAllService = require("../../services/common/GetAllService");
const UpdateService = require("../../services/common/UpdateService");
const mongoose = require("mongoose");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const ProductsModel = require("../../models/Products/ProductsModel");
const ProductCategoryModel = require("../../models/ProductCategory/ProductCategoryModel");
const CheckColorAssociateService = require("../../services/color/CheckColorAssociateService");


exports.CreateColor=async (req, res) => {
    let Result=await CreateService(req,ColorModel);
    res.status(200).json(Result)
}


exports.UpdateColor=async(req,res)=>{
    let Result=await UpdateService(req,ColorModel)
    res.status(200).json(Result)
}


exports.GetColor=async (req, res) => {
    let Result=await DetailsByIDService(req,ColorModel);
    res.status(200).json(Result)
}

exports.GetAllColor=async(req,res)=>{
    let Projection = {$project:{_id:1, ColorName:1}};
    let Result=await GetAllService(req,ColorModel,Projection)
    res.status(200).json(Result)
}



exports.DeleteColor=async (req, res) => {

    let CheckAssociate= await CheckColorAssociateService(req,ProductsModel);
    if(CheckAssociate){
      res.status(200).json({status: "associate", data: "associated with Product"})
    }
    else{
      let Result=await DeleteService(req,ColorModel);
      res.status(200).json(Result)
    }
}

