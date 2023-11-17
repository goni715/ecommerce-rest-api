const UsersModel = require("../../models/Users/UsersModel");
const RegOTPModel = require("../../models/Users/RegOTPModel");
const CartModel = require("../../models/Cart/CartModel");
const CouponModel = require("../../models/Coupon/CouponModel");
const OTPSModel = require("../../models/Users/OTPSModel");
const jwt = require("jsonwebtoken");
const ResetTokenModel = require("../../models/Users/ResetTokenModel");
const UserCreateService = require("../../services/user/UserCreateService");
const UserLoginService = require("../../services/user/UserLoginService");
const GetAllUsersService = require("../../services/user/GetAllUsersService");
const GetUserDetailsByIDService = require("../../services/user/GetUserDetailsByIDService");
const DeleteUserByIDService = require("../../services/user/DeleteUserByIDService");
const UserUpdateService = require("../../services/user/UserUpdateService");
const BlockUserService = require("../../services/user/BlockUserService");
const UnblockUserService = require("../../services/user/UnblockUserService");
const ChangePasswordService = require("../../services/user/ChangePasswordService");
const ForgotPasswordVerifyEmailService = require("../../services/ForgotPassword/ForgotPasswordVerifyEmailService");
const ForgotPasswordVerifyOtpService = require("../../services/ForgotPassword/ForgotPasswordVerifyOtpService");
const CreateNewPasswordService = require("../../services/ForgotPassword/CreateNewPasswordService");
const RecoverPasswordVerifyEmailService = require("../../services/RecoverPassword/RecoverPasswordVerifyEmailService");
const ResetPasswordService = require("../../services/RecoverPassword/ResetPasswordService");
const AdminLoginService = require("../../services/user/AdminLoginService");
const GetWishlistService = require("../../services/user/GetWishlistService");
const ApplyCouponService = require("../../services/coupon/ApplyCouponService");
const SignUpEmailVerifyService = require("../../services/SignUpWithEmailVerify/SignUpEmailVerifyService");
const SignUpVerifyOtpService = require("../../services/SignUpWithEmailVerify/SignUpVerifyOtpService");



exports.Registration=async (req, res) => {
    let Result=await UserCreateService(req,UsersModel)
    res.status(200).json(Result)
}





//SignUpUser Email Verify--Step-01//OTP-Send
exports.SignUpEmailVerify = async (req,res)=> {

    let Result=await SignUpEmailVerifyService(req,UsersModel,RegOTPModel)
    res.status(200).json(Result)


}


//SignUp//SignUpVerifyOTP--Step-02--DataInsert-
exports.SignUpVerifyOTP = async (req,res)=>{

    let Result = await SignUpVerifyOtpService(req,UsersModel,RegOTPModel)
    res.status(200).json(Result)

}






exports.Login=async(req,res)=>{
    let Result=await UserLoginService(req,res,UsersModel)
    res.status(200).json(Result)
}

exports.AdminLogin=async(req,res)=>{
    let Result=await AdminLoginService(req,res,UsersModel)
    res.status(200).json(Result)
}


exports.GetAllUser=async(req,res)=>{
    let Result=await GetAllUsersService(req,UsersModel)
    res.status(200).json(Result)
}


//Get Single User
exports.GetUser=async (req, res) => {
    let Result=await GetUserDetailsByIDService(req,UsersModel);
    res.status(200).json(Result)
}

//Delete Single User
exports.DeleteUser=async (req, res) => {
    let Result=await DeleteUserByIDService(req,UsersModel)
    res.status(200).json(Result)
}


//Update a Single User
exports.UpdateUser=async (req, res) => {
    let Result=await UserUpdateService(req,UsersModel)
    res.status(200).json(Result)
}



//Block User
exports.BlockUser=async (req, res) => {
    let Result=await BlockUserService(req,UsersModel)
    res.status(200).json(Result)
}




//UnBlock User
exports.UnblockUser=async (req, res) => {
    let Result=await UnblockUserService(req,UsersModel)
    res.status(200).json(Result)
}


//handle refresh Token
exports.RefreshToken= async (req, res) => {

    try{
        const cookie = req.cookies;
        //console.log(cookie);

        if (!cookie.refreshToken) {
            res.status(200).json("No Refresh token in Cookies");
        }

           const refreshToken = cookie.refreshToken;
           //console.log(refreshToken);
            let user =await UsersModel.aggregate([{$match:{refreshToken:refreshToken}}])
            if(!user){
              res.status(200).json("No Refresh Token in Database");
           }

           jwt.verify(refreshToken,"SecretKey123456789",function (err,decoded) {

               if(err || user[0].email !== decoded['data'] ){
                    res.status(401).json({status:"There is something wrong with refresh token"})
                }

                   let email =decoded['data'];
                   let Payload={exp: Math.floor(Date.now() / 1000) + (24*60*60), data:email}
                   let NewAccessToken = jwt.sign(Payload, 'SecretKey123456789');

                   res.status(200).json({accessToken: NewAccessToken})


            })

    }
    catch (error) {
        res.status(200).json({status: "Something Went Wrong"});
    }

}




//Logout
exports.Logout=async (req, res) => {

    const cookie = req.cookies;

    if (!cookie.refreshToken) {
        res.status(200).json("No Refresh token in Cookies");
    }

    const refreshToken = cookie.refreshToken;
    let user =await UsersModel.aggregate([{$match:{refreshToken:refreshToken}}])
    if(!user){
        res.clearCookie('refreshToken',{
            httpOnly: true,
            secure: true
        })
        res.sendStatus(204);
    }

    let update = await UsersModel.updateOne({refreshToken:refreshToken},{refreshToken:""})
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });
    res.sendStatus(204);
}



//ChangePassword
exports.ChangePassword = async (req,res)=>{
    let Result = await ChangePasswordService(req,UsersModel);
    res.status(200).json(Result)
}



//Step-01// Send OTP
exports.ForgotPasswordVerifyEmail=async (req,res)=>{
    let Result=await ForgotPasswordVerifyEmailService(req,UsersModel)
    res.status(200).json(Result)
}


//Step-02// Verify OTP
exports.ForgotPasswordVerifyOTP=async (req,res)=>{
    let Result=await ForgotPasswordVerifyOtpService(req,OTPSModel)
    res.status(200).json(Result)
}


//Step-03
exports.CreateNewPassword=async (req,res)=>{
    let Result=await CreateNewPasswordService(req,UsersModel,OTPSModel)
    res.status(200).json(Result)
}






//Recover Password
//Step-01//
exports.RecoverPasswordVerifyEmail=async (req,res)=>{
    let Result=await RecoverPasswordVerifyEmailService(req,UsersModel)
    res.status(200).json(Result)
}

//Step-02
exports.ResetPassword=async (req,res)=>{
    let Result=await ResetPasswordService(req,UsersModel,ResetTokenModel)
    res.status(200).json(Result)
}



exports.GetWishlist=async (req, res) => {
    let Result=await GetWishlistService(req,UsersModel);
    res.status(200).json(Result)
}



exports.SaveAddress=async (req, res) => {
    let Result=await UserUpdateService(req,UsersModel)
    res.status(200).json(Result)
}

exports.ApplyCoupon=async (req, res) => {
    let Result=await ApplyCouponService(req, CouponModel, CartModel)
    res.status(200).json(Result)
}

