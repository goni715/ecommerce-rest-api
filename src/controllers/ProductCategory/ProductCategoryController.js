const CreateService = require("../../services/common/CreateService");
const ProductCategoryModel = require("../../models/ProductCategory/ProductCategoryModel");
const DeleteService = require("../../services/common/DeleteService");
const DetailsByIDService = require("../../services/common/DetailsByIDService");
const GetAllService = require("../../services/common/GetAllService");
const UpdateService = require("../../services/common/UpdateService");
const ProductsModel = require("../../models/Products/ProductsModel");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const mongoose = require("mongoose");


exports.CreateProductCategory=async (req, res) => {
    let Result=await CreateService(req,ProductCategoryModel);
    res.status(200).json(Result)
}


exports.UpdateProductCategory=async(req,res)=>{
    let Result=await UpdateService(req,ProductCategoryModel)
    res.status(200).json(Result)
}


exports.DeleteProductCategory=async (req, res) => {
    let DeleteID=req.params.id;
    const ObjectId = mongoose.Types.ObjectId;
    let CheckAssociate= await CheckAssociateService({CategoryID: new ObjectId(DeleteID)},ProductsModel);

    if(CheckAssociate){
        res.status(200).json({status: "associate", data: "associated with Product"})
    }
    else{
        let Result=await DeleteService(req,ProductCategoryModel);
        res.status(200).json(Result)
    }
}


exports.GetProductCategory=async (req, res) => {
    let Result=await DetailsByIDService(req,ProductCategoryModel);
    res.status(200).json(Result)
}

exports.GetAllProductCategory=async(req,res)=>{
    let Projection = {$project:{_id:1, CategoryName:1}};
    let Result=await GetAllService(req,ProductCategoryModel,Projection)
    res.status(200).json(Result)
}
