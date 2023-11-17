const CreateService = require("../../services/common/CreateService");
const BlogModel = require("../../models/Blog/BlogModel");
const GetBlogByIDService = require("../../services/blog/GetBlogByIDService");
const DeleteService = require("../../services/common/DeleteService");
const LikeBlogService = require("../../services/blog/LikeBlogService");
const DislikeBlogService = require("../../services/blog/DislikeBlogService");
const UpdateService = require("../../services/common/UpdateService");
const GetAllBlogsService = require("../../services/blog/GetAllBlogsService");



exports.CreateBlog=async (req, res) => {
    let Result=await CreateService(req, BlogModel);
    res.status(200).json(Result)
}

exports.UpdateBlog=async(req,res)=>{
    let Result=await UpdateService(req,BlogModel)
    res.status(200).json(Result)
}


exports.GetABlog=async (req, res) => {
    let Result=await GetBlogByIDService(req,BlogModel);
    res.status(200).json(Result)
}


exports.GetAllBlogs=async(req,res)=>{
    let Result=await GetAllBlogsService(req,BlogModel)
    res.status(200).json(Result)
}

exports.DeleteBlog=async(req,res)=>{
    let Result=await DeleteService(req,BlogModel)
    res.status(200).json(Result)
}


exports.LikeBlog=async(req,res)=>{
    let Result=await LikeBlogService(req,BlogModel)
    res.status(200).json(Result)
}

exports.DislikeBlog=async(req,res)=>{
    let Result=await DislikeBlogService(req,BlogModel)
    res.status(200).json(Result)
}
