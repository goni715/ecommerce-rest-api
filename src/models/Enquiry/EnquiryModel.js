const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
const EnquirySchema = mongoose.Schema(
    {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
      },
      mobile: {
         type: String,
         required: true,
      },
      comment: {
         type: String,
         required: true,
     },
     status: {
         type: String,
         default: "Submitted",
         enum: ["Submitted", "Contacted", "In Progress", "Resolved"],
     },
  },
    { timestamps: true, versionKey:false}
);

//Export the model
const EnquiryModel=mongoose.model('enquiry',EnquirySchema);
module.exports=EnquiryModel