const  mongoose=require('mongoose');
const OTPSchema=mongoose.Schema(
    {

    email:{
        type:String
    },
    otp:{
        type:String
    },
    status:{
        type:Number,
        default:0
    },
    otpExpires:{
        type: Date,
        default: Date.now() + (10 * 60 * 1000) // 10 minutes //OTP Code Will be expired within 10 minutes
    }
  },
    { timestamps: true, versionKey:false},
);
const OTPSModel=mongoose.model('otps',OTPSchema);
module.exports=OTPSModel

