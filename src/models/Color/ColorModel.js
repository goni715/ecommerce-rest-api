const  mongoose=require('mongoose');
const ColorSchema=mongoose.Schema(
    {
        ColorName: {
            type: String,
            required: true,
            unique: true,
            index: true,
        }
    },
    { timestamps: true, versionKey:false},
);
const ColorModel=mongoose.model('color',ColorSchema);
module.exports=ColorModel

