const  mongoose=require('mongoose');
const BlogCategorySchema=mongoose.Schema(
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
const BlogCategoryModel=mongoose.model('BlogCategory',BlogCategorySchema);
module.exports=BlogCategoryModel

