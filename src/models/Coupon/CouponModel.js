const  mongoose=require('mongoose');
const CouponSchema=mongoose.Schema(
    {
       name: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
        },
        expiry: {
            type: Date,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true, versionKey:false},
);
const CouponModel=mongoose.model('coupon',CouponSchema);
module.exports=CouponModel

