const  mongoose=require('mongoose');


const DataSchema =mongoose.Schema(
    {

        ProductName:{
            type:String,
            required:true,
            trim: true
        },
        slug:{
            type:String,
            required:true,
            unique: true,
            lowercase:true
        },
        description:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
        },
        CategoryID:{
            type:mongoose.Schema.Types.ObjectId
        },
        BrandID:{
            type:mongoose.Schema.Types.ObjectId
        },
        sold: {
            type: Number,
            default: 0,
        },
        images: [
            {
                public_id: String,
                image_url: String,
            }
        ],
        color: [
                {type:mongoose.Schema.Types.ObjectId}
        ],
        tags: String,
        ratings: [
            {
                star: Number,
                comment: String,
                postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "uses" },
            }
        ],
        totalRating: {
            type: String,
            default: 0,
        }

    },
    { timestamps: true, versionKey:false},
);



const ProductsModel=mongoose.model('products',DataSchema);
module.exports=ProductsModel

