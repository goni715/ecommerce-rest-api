const CreateService = require("../../services/common/CreateService");
const EnquiryModel = require("../../models/Enquiry/EnquiryModel");
const DeleteService = require("../../services/common/DeleteService");
const DetailsByIDService = require("../../services/common/DetailsByIDService");
const GetAllService = require("../../services/common/GetAllService");
const UpdateService = require("../../services/common/UpdateService");


exports.CreateEnquiry=async (req, res) => {
    let Result=await CreateService(req,EnquiryModel);
    res.status(200).json(Result)
}


exports.UpdateEnquiry=async(req,res)=>{
    let Result=await UpdateService(req,EnquiryModel)
    res.status(200).json(Result)
}


exports.DeleteEnquiry=async(req,res)=>{
    let Result=await DeleteService(req,EnquiryModel)
    res.status(200).json(Result)
}



exports.GetEnquiry=async (req, res) => {
    let Result=await DetailsByIDService(req,EnquiryModel);
    res.status(200).json(Result)
}

exports.GetAllEnquiry=async(req,res)=>{
    let Projection = {$project:{_id:1, name:1, email:1, mobile:1, comment:1, status:1, createdAt:1, updatedAt:1}};
    let Result=await GetAllService(req,EnquiryModel,Projection)
    res.status(200).json(Result)
}
