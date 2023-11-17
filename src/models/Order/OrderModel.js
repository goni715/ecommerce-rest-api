const  mongoose=require('mongoose');


const OrderSchema =mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref:"users", required:true},
        shippingInfo: {
           address:{
               type: String,
               required: true
           },
           city:{
                type: String,
                required: true
           },
           country:{
                type: String,
                required: true
            },
       },
        orderItems: [
            {
                ProductID: {type: mongoose.Schema.Types.ObjectId, ref: "products", required:true},
                color: {type: mongoose.Schema.Types.ObjectId, ref: "colors", required:true},
                quantity: {type: Number, required:true},
                //price: {type: Number, required:true},
            },
        ],
        paidStatus:{
            type: Boolean
        },
        totalPrice:{
            type:Number, required:true
        },
        transactionID: {
            type: String, required:true
        },
        paidAt:{
            type: Date,
            default: Date.now()
        },
        month:{
            type:String,
            default: new Date().getMonth() //0,1,2,3,4,5,6,7,8,9,10,11
        },
        totalPriceAfterDiscount:{
            type:Number
        },
        orderStatus: {
            type: String,
            default: "Ordered",
            enum: [
                "Ordered",
                "Processed",
                "Shipped",
                "Out For Delivery",
                "Delivered",
            ],
        }

    },
    { timestamps: true, versionKey:false},
);



const OrderModel=mongoose.model('orders',OrderSchema);
module.exports=OrderModel

