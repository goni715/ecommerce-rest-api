const  mongoose=require('mongoose');
const PracticeSchema=mongoose.Schema(
    {
        item: {
            type: String,
            required: true,
        },
        sizes:[

        ]

    },
    { timestamps: true, versionKey:false},
);
const PracticeModel=mongoose.model('practice',PracticeSchema);
module.exports=PracticeModel

