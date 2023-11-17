

const GetYearlyTotalOrdersService = async (Request,OrderModel) => {


    try{

        let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        let d = new Date();
        let endDate="";
        d.setDate(1)


        for(let index=0; index < 11; index++){
            d.setMonth(d.getMonth()-1)
            endDate=monthNames[d.getMonth()]+ " " + d.getFullYear()
        }




        const data = await OrderModel.aggregate([
            {
                $match: {createdAt: {// আজকের তারিখ থেকে কম বা সমান//
                        $lte: new Date(),
                        $gte: new Date(endDate)

                    }}
            },


            {
                $group: {
                    _id:null,//এক বছ্রে সকল Order
                    count: {$sum:1},
                    amount:{$sum: "$totalPrice"}
                }
            }

        ])



        return {status:"success", data:data};


    }
    catch(error) {
        return {status:"fail", data:error};
    }

}

module.exports=GetYearlyTotalOrdersService