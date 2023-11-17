const AddToCartService = require("../../services/cart/AddToCartService");
const UsersModel = require("../../models/Users/UsersModel");
const GetUserCartService = require("../../services/cart/GetUserCartService");
const CartModel = require("../../models/Cart/CartModel");
const RemoveCartService = require("../../services/cart/RemoveProductFromCartService");
const GetAllService = require("../../services/common/GetAllService");
const BrandModel = require("../../models/Brand/BrandModel");
const UpdateProductQuantityFromCartService = require("../../services/cart/UpdateProductQuantityFromCartService");
const RemoveProductFromCartService = require("../../services/cart/RemoveProductFromCartService");
const DeleteUserCartService = require("../../services/cart/DeleteUserCartService");


//Add to Cart
exports.AddToCart=async (req, res) => {
    let Result=await AddToCartService(req,CartModel)
    res.status(200).json(Result)
}


exports.GetUserCart=async (req, res) => {
    let Result=await GetUserCartService(req,CartModel)
    res.status(200).json(Result)
}

exports.GetAllCart=async(req,res)=>{
    let Projection = {$project:{_id:1, products:1}};
    let Result=await GetAllService(req,CartModel,Projection)
    res.status(200).json(Result)
}



exports.RemoveProductFromCart=async (req, res) => {
    let Result=await RemoveProductFromCartService(req,CartModel)
    res.status(200).json(Result)
}


exports.UpdateProductQuantityFromCart=async (req, res) => {
    let Result=await UpdateProductQuantityFromCartService(req,CartModel)
    res.status(200).json(Result)
}


exports.DeleteUserCart=async (req, res) => {
    let Result=await DeleteUserCartService(req,CartModel)
    res.status(200).json(Result)
}

