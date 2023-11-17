const cloudinary  = require('../../utility/cloudinary');
const ProductsModel = require("../../models/Products/ProductsModel");
const BlogModel = require("../../models/Blog/BlogModel");
const mongoose = require("mongoose");
// Import the filesystem module
const fs = require('fs');
const CurrentDate = require("../../helper/DateHelper");



exports.UploadProductImage = async (req, res) => {

     let ID=req.params.id;
     const ObjectId = mongoose.Types.ObjectId;
     let UpdateQueryObject = {_id: new ObjectId(ID)};

     try{

          let UploadedImages =[];

          if (req.files) {

               const files = req.files;
               for (const file of files) {
                    let cloudinaryResponse = await cloudinary.uploader.upload(file.path, {
                         folder: "products",
                    });

                    fs.unlinkSync(file.path);

                    let image = {
                         public_id: cloudinaryResponse.public_id,
                         image_url: cloudinaryResponse?.secure_url
                    }

                    UploadedImages.push(image) ;
               }


               let UpdateProduct = await ProductsModel.updateOne(UpdateQueryObject,{
                    images: UploadedImages
               })





               res.status(200).json({status: 'success', result: UpdateProduct});

          } else {
               res.json('Please provide a file');
          }


     }
     catch (error) {
          res.json({status:"fail", data:error});
     }


}





exports.UploadBlogImage = async (req, res) => {

     let ID=req.params.id;
     const ObjectId = mongoose.Types.ObjectId;
     let UpdateQueryObject = {_id: new ObjectId(ID)};

     try{

          let UploadedImages =[];

          if (req.files) {

               const files = req.files;
               for (const file of files) {
                    let cloudinaryResponse = await cloudinary.uploader.upload(file.path, {
                         folder: "Blogs",
                    });

                    fs.unlinkSync(file.path);

                    let image = {
                         public_id: cloudinaryResponse.public_id,
                         image_url: cloudinaryResponse?.secure_url
                    }

                    UploadedImages.push(image) ;
               }


               let UpdateProduct = await BlogModel.updateOne(UpdateQueryObject,{
                    images: UploadedImages
               })





               res.status(200).json({status: 'success', result: UpdateProduct});

          } else {
               res.json('Please provide a file');
          }


     }
     catch (error) {
          res.json({status:"fail", data:error});
     }


}









exports.uploadImage = async (req, res) => {

     let cloudinaryResponse;

     try{
          if (req.file) {
               cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
                    folder: "Gallery",
                    //width: 300,
                    //height:300,
                   // crop: "scale"
               });

               fs.unlinkSync(req.file.path);
          } else {
               res.json('Please provide a file');
          }

          res.status(200).json({
               status: 'success',
               data: {
                   public_id: cloudinaryResponse?.public_id,
                   image_url: cloudinaryResponse?.secure_url,
               },
               result: cloudinaryResponse
          });
     }
     catch (error) {
          res.json({status:"fail", data:error});
     }


}





///Upload Multiple Image

exports.uploadMultipleImage = async (req, res) => {



     try{

          let UploadedImages =[];

          if (req.files) {

               const files = req.files;
               for (const file of files) {
                   let cloudinaryResponse = await cloudinary.uploader.upload(file.path, {
                          folder: "Ecommerce",
                           //width: 300,
                           // crop: "scale"
                        });
                    fs.unlinkSync(file.path);

                    let image = {
                         public_id: cloudinaryResponse.public_id,
                         image_url: cloudinaryResponse?.secure_url
                    }
                    UploadedImages.push(image) ;
               }

          } else {
               res.json('Please provide a file');
          }


          //console.log(UploadedImages);

          res.status(200).json({status: 'success', data: UploadedImages});
     }
     catch (error) {
          res.json({status:"fail", data:error});
     }


}



//Delete image in Cloudinary
exports.DeleteImage = async (req, res) => {

     let public_id = req.body['public_id'];

     try{

           let cloudinaryResponse = await cloudinary.uploader.destroy(public_id);

          res.status(200).json({
               status: 'success',
               data: cloudinaryResponse,
          });
     }
     catch (error) {
          res.json({status:"fail", data:error});
     }


}





//Delete image in Cloudinary

exports.DeleteProductImage = async (req, res) => {


     let ID=req.params.id;
     const ObjectId = mongoose.Types.ObjectId;
     let QueryObject = {_id: new ObjectId(ID)};
     let public_id = req.body['public_id'];

     try{

          let product = await ProductsModel.aggregate([{$match: QueryObject}])
          let ProductImages = product[0].images; //Array

          let FindImage = ProductImages.find((currentValue)=> currentValue.public_id === public_id);

          if(FindImage){

               let cloudinaryResponse = await cloudinary.uploader.destroy(public_id);

               let result = ProductImages.filter((currentValue)=> currentValue.public_id !== public_id);
               let UpdateProduct = await ProductsModel.updateOne(QueryObject,{images: result})

               res.status(200).json({status: 'success',data: result, public_id: public_id, result:"ProductImageDelete", find: FindImage});

          }else{

               let cloudinaryResponse = await cloudinary.uploader.destroy(public_id);

               res.status(200).json({
                    status: 'success',
                    data: cloudinaryResponse,
                    result:"DemoImageDelete"
               });
          }
     }
     catch (error) {
          res.json({status:"fail", data:error});
     }


}









//Delete image in Cloudinary
exports.DeleteBlogImage = async (req, res) => {


     let ID=req.params.id;
     const ObjectId = mongoose.Types.ObjectId;
     let QueryObject = {_id: new ObjectId(ID)};
     let public_id = req.body['public_id'];

     try{

          let blog = await BlogModel.aggregate([{$match: QueryObject}])
          let BlogImages = blog[0].images; //Array

          let FindImage = BlogImages.find((currentValue)=> currentValue.public_id === public_id);

          if(FindImage){

               let cloudinaryResponse = await cloudinary.uploader.destroy(public_id);

               let result = BlogImages.filter((currentValue)=> currentValue.public_id !== public_id);
               let UpdateProduct = await BlogModel.updateOne(QueryObject,{images: result})

               res.status(200).json({status: 'success',data: result, public_id: public_id, result:"BlogImageDelete", find: FindImage});
               
          }else{

               let cloudinaryResponse = await cloudinary.uploader.destroy(public_id);

               res.status(200).json({
                    status: 'success',
                    data: cloudinaryResponse,
                    result:"DemoImageDelete"
               });
          }

     }
     catch (error) {
          res.json({status:"fail", data:error});
     }






}






