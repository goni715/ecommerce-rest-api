
const FilterProductsService= async (Request,DataModel) => {



    try {


        let SearchValue = Request.params.searchValue;
        let letterSorting = Number(Request.params.letter);
        let priceSorting = Number(Request.params.price);
        let dateSorting = Number(Request.params.date);
        let Category = Request.params.category;
        let FromPrice = Number(Request.params.fromPrice);
        let ToPrice = Number(Request.params.toPrice);
        let CheckEmpty = Request.params.empty;



        let data;

        if(CheckEmpty === "empty") {
             data = await DataModel.aggregate([
                 {$project:{_id:1,title:1,slug:1,description:1,price:1,quantity:1,category:1,brand:1,color:1, totalRating:1, images:1, ratings:1, createdAt:1, updatedAt:1}}
             ])
        }
        else if(SearchValue !== "0") {

            let SearchRgx = {"$regex": SearchValue, "$options": "i"}
            let SearchQuery = {$or: [{brand: SearchRgx}, {category: SearchRgx}, {color: SearchRgx}, {description:SearchRgx}]}

            data = await DataModel.aggregate([{
                $facet:{
                    Total:[{$match: SearchQuery},{$count: "count"}],
                    Rows:[{$match: SearchQuery}],
                }
            }])
        }
        else if(letterSorting !== 0){
          data = await DataModel.aggregate([{$sort : { title: letterSorting }}])
        }
        else if(FromPrice !==0 ){
            data = await DataModel.aggregate([{$match : { price: {$gte: FromPrice, $lte: ToPrice}}}, {$sort : { price : 1 }}])
        }
        else if(priceSorting !== 0){
           data = await DataModel.aggregate([{$sort : { price: priceSorting }}])
        }
        else if(dateSorting !== 0){
            data = await DataModel.aggregate([{$sort : { createdAt: dateSorting }}])
        }
        else if(Category !== 0){
           data = await DataModel.aggregate([{$match : { category:Category }}])
        }



        return  {status: "success", data: data}


    } catch (error) {
        return {status: "fail", data: error}
    }
}
module.exports=FilterProductsService