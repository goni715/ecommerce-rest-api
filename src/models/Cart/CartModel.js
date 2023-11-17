const  mongoose=require('mongoose');


const CartSchema =mongoose.Schema(
    {
        userID: {type: mongoose.Schema.Types.ObjectId, ref: "users"},
        ProductID: {type: mongoose.Schema.Types.ObjectId, ref: "products"},
        quantity: {type: Number, required: true},
        ColorID: {type: mongoose.Schema.Types.ObjectId, ref: "colors"},


    },
    { timestamps: true, versionKey:false},
);



const CartModel=mongoose.model('carts',CartSchema);
module.exports=CartModel

