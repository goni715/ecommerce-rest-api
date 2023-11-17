


const GetMonthWiseOrderIncomeService = async (Request,OrderModel) => {


    try{

        let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        let d = new Date();
        let endDate="";
        d.setDate(1)


        for(let index=0; index < 11; index++){
            d.setMonth(d.getMonth()-1)
            endDate=monthNames[d.getMonth()]+ " " + d.getFullYear()
        }



        //console.log(new Date());//current Date
        //console.log(Date.now());//current string Date

        const data = await OrderModel.aggregate([
            {
                $match: {createdAt: {// আজকের তারিখ থেকে কম বা সমান//
                        $lte: new Date(),
                        $gte: new Date(endDate)
                    }}
            },
            {
                $group: {
                    _id:"$month",
                    amount: {$sum:"$totalPrice"}
                }
            },
            {
                $sort: {_id:1}
            }

        ])





        let months = [
            {
                id: 0,
                month: 'January',
            },
            {
                id: 1,
                month: 'February',
            },
            {
                id: 2,
                month: 'March',
            },
            {
                id: 3,
                month: 'April',
            },
            {
                id: 4,
                month: 'May',
            },
            {
                id: 5,
                month: 'June',
            },
            {
                id: 6,
                month: 'July',
            },
            {
                id: 7,
                month: 'August',
            },
            {
                id: 8,
                month: 'September',
            },
            {
                id: 9,
                month: 'October',
            },
            {
                id: 10,
                month: 'November',
            },
            {
                id: 11,
                month: 'December'
            },

        ];



        await data.forEach((item,i)=>{
            let result = months.find((currentValue)=>currentValue.id.toString() === data[i]._id.toString());
            if(result.id.toString() === data[i]._id.toString() ){
                item.month=result.month;
            }
        })



        return {status:"success", data:data};


    }
    catch(error) {
        return {status:"fail", data:error};
    }

}

module.exports=GetMonthWiseOrderIncomeService