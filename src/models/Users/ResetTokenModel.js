const  mongoose=require('mongoose');
const ResetTokenSchema=mongoose.Schema(
    {

        email:{
            type:String
        },
        token:{
            type:String
        },
        status:{
            type:Number,
            default:0
        },
        tokenExpires:{
            type: Date,
            default: Date.now() + 600000 // 10 minutes //OTP Code Will be expired within 10 minutes
        }
    },
    { timestamps: true, versionKey:false},
);
const OTPSModel=mongoose.model('resettokens',ResetTokenSchema);
module.exports=OTPSModel

