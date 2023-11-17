const  mongoose=require('mongoose');
const BrandSchema=mongoose.Schema(
    {
        BrandName: {
            type: String,
            required: true,
            unique: true,
            index: true,
        }
    },
    { timestamps: true, versionKey:false},
);
const BrandModel=mongoose.model('brand',BrandSchema);
module.exports=BrandModel

