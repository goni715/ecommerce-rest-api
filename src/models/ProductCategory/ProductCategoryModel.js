const  mongoose=require('mongoose');
const ProductCategorySchema=mongoose.Schema(
    {
        CategoryName: {
            type: String,
            required: true,
            unique: true,
            index: true,
        }
    },
    { timestamps: true, versionKey:false},
);
const ProductCategoryModel=mongoose.model('ProductCategory',ProductCategorySchema);
module.exports=ProductCategoryModel

