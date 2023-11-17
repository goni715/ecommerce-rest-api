const ProductsModel = require("../../models/Products/ProductsModel");
const UsersModel = require("../../models/Users/UsersModel");
const CreateProductService = require("../../services/products/CreateProductService");
const GetAllProductsService = require("../../services/products/GetAllProductsService");
const UpdateProductService = require("../../services/products/UpdateProductService");
const DeleteService = require("../../services/common/DeleteService");
const RatingService = require("../../services/products/RatingService");
const FilterProductsService = require("../../services/products/FilterProductsService");
const GetProductByIDService = require("../../services/products/GetProductByIDService");
const OrderModel = require("../../models/Order/OrderModel");
const AddToWishListService = require("../../services/products/AddToWishListService");
const RemoveWishListService = require("../../services/products/RemoveWishListService");
const CheckOrderAssociateService = require("../../services/products/CheckOrderAssociateService");




exports.CreateProduct=async (req, res) => {
    let Result=await CreateProductService(req, ProductsModel);
    res.status(200).json(Result)
}


exports.GetAProduct=async (req, res) => {
    let Result=await GetProductByIDService(req, ProductsModel);
    res.status(200).json(Result)
}


exports.GetAllProducts=async (req, res) => {
    let Result=await GetAllProductsService(req, ProductsModel);
    res.status(200).json(Result)
}


exports.UpdateProduct=async (req, res) => {
    let Result=await UpdateProductService(req, ProductsModel);
    res.status(200).json(Result)
}


exports.AddToWishList=async(req,res)=>{
    let Result=await AddToWishListService(req, UsersModel)
    res.status(200).json(Result)
}

exports.RemoveWishList=async(req,res)=>{
    let Result=await RemoveWishListService(req, UsersModel)
    res.status(200).json(Result)
}


exports.Rating=async(req,res)=>{
    let Result=await RatingService(req, ProductsModel);
    res.status(200).json(Result)
}


exports.FilterProducts=async(req,res)=>{
    let Result=await FilterProductsService(req, ProductsModel)
    res.status(200).json(Result)
}



exports.DeleteProduct=async (req, res) => {
    let CheckOrderAssociate= await CheckOrderAssociateService(req,OrderModel);
    if(CheckOrderAssociate){
        res.status(200).json({status: "associate", data: "associated with Order"})
    }
    else{
        let Result=await DeleteService(req,ProductsModel);
        res.status(200).json(Result)
    }
}
