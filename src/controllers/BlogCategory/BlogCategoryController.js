const CreateService = require("../../services/common/CreateService");
const BlogCategoryModel = require("../../models/BlogCategory/BlogCategoryModel");
const DeleteService = require("../../services/common/DeleteService");
const DetailsByIDService = require("../../services/common/DetailsByIDService");
const GetAllService = require("../../services/common/GetAllService");
const UpdateService = require("../../services/common/UpdateService");
const mongoose = require("mongoose");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const ProductsModel = require("../../models/Products/ProductsModel");
const BrandModel = require("../../models/Brand/BrandModel");
const BlogModel = require("../../models/Blog/BlogModel");

exports.CreateBlogCategory=async (req, res) => {
    let Result=await CreateService(req,BlogCategoryModel);
    res.status(200).json(Result)
}


exports.UpdateBlogCategory=async(req,res)=>{
    let Result=await UpdateService(req,BlogCategoryModel)
    res.status(200).json(Result)
}



/*
exports.DeleteBlogCategory=async(req,res)=>{
    let Result=await DeleteService(req,BlogCategoryModel)
    res.status(200).json(Result)
}

 */


exports.DeleteBlogCategory=async (req, res) => {
    let DeleteID=req.params.id;
    const ObjectId = mongoose.Types.ObjectId;
    let CheckAssociate= await CheckAssociateService({CategoryID: new ObjectId(DeleteID)},BlogModel);

    if(CheckAssociate){
        res.status(200).json({status: "associate", data: "associated with Blog"})
    }
    else{
        let Result=await DeleteService(req,BlogCategoryModel);
        res.status(200).json(Result)
    }
}



exports.GetBlogCategory=async (req, res) => {
    let Result=await DetailsByIDService(req,BlogCategoryModel);
    res.status(200).json(Result)
}

exports.GetAllBlogCategory=async(req,res)=>{
    let Projection = {$project:{_id:1, CategoryName:1}};
    let Result=await GetAllService(req,BlogCategoryModel,Projection)
    res.status(200).json(Result)
}
