const slugify = require("slugify");
const CreateProductService= async (Request,DataModel) => {

    try{

        let PostBody=Request.body;

        if(PostBody.ProductName){
            PostBody.slug=slugify(PostBody.ProductName);
        }

        let data = await DataModel.create(PostBody)
        return {status: "success", data: data}
    }
    catch (error) {
        return {status: "fail", data: error}
    }
}
module.exports=CreateProductService