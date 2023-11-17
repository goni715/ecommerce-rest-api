const  mongoose=require('mongoose');


const BlogSchema =mongoose.Schema(
    {
        BlogName: {
            type: String,
            required: true,
            unique:true
        },
        CategoryID:{
            type:mongoose.Schema.Types.ObjectId
        },
        description: {
            type: String,
            required: true,
        },
        numViews: {
            type: Number,
            default: 0,
        },
        likes: [
            { type: mongoose.Schema.Types.ObjectId, ref: "users" } //ref=collection name=> users collection
        ],
        dislikes: [
            {type: mongoose.Schema.Types.ObjectId, ref: "users"},  //ref=collection name=> users collection
        ],
        author: {
            type: String,
            default: "Admin",
        },
        images: [
            {
                public_id: String,
                image_url: String,
            }
        ],
    },
    {
        timestamps: true,
        versionKey:false
    },
);



const BlogModel=mongoose.model('blogs',BlogSchema);
module.exports=BlogModel

