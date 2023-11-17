const mongoose=require('mongoose');


const DataSchema =mongoose.Schema(
    {

        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            unique:true,
            required:true
        },
        mobile:{
            type:String,
            required: true,
            unique:true
        },
        password:{
            type:String,
            required: true
        },
        role: {
            type: String,
            default: "user",
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        cart: {
            type: Array,
            default: [],
        },
        address: {
            type: String,
        },
        wishlist: [
            { type: mongoose.Schema.Types.ObjectId, ref: "products" }//ref=collection name=> products collection
        ],
        refreshToken: {
            type: String,
        }
    },
    { timestamps: true, versionKey:false},
);





const UsersModel=mongoose.model('users',DataSchema);
module.exports=UsersModel

