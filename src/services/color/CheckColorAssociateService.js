const CheckColorAssociateService= async (Request, AssociateModel) => {



    try{

        let DeleteID=Request.params.id;

       let Products = await AssociateModel.aggregate([{$project:{_id:1, ProductName:1, color:1}}]);


        let alreadyColorUsed;

        for(let i=0; i < Products.length; i++){
           if(Products[i]['color'].find((currentValue) => currentValue.toString() === DeleteID.toString())){
               alreadyColorUsed = Products[i]['color'].find((currentValue) => currentValue.toString() === DeleteID.toString());
           }
        }

       return alreadyColorUsed;

    }
    catch (error) {
        return false;
    }
}
module.exports=CheckColorAssociateService