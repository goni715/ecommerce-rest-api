const mongoose = require("mongoose");
const SSLCommerzPayment = require("sslcommerz-lts");

const CreateOrderWithPaymentService = async (Request,OrderModel) => {




    try{

        let LoginUserID=Request.headers.id;
        const ObjectId = mongoose.Types.ObjectId;

        let shippingInfo = Request.body['shippingInfo'];
        let orderItems = Request.body['orderItems'];
        let totalPrice = Request.body['totalPrice'];
        //let totalPriceAfterDiscount = req.body['totalPriceAfterDiscount'];


        const store_id = 'hales647657a83c919';
        const store_passwd = 'hales647657a83c919@ssl'
        const is_live = false; //true for live, false for sandbox


        const transaction_id = new ObjectId().toString();


        const data = {
            total_amount: totalPrice,
            currency: 'BDT',
            tran_id: transaction_id, // use unique tran_id for each api call
            success_url: 'http://localhost:5000/api/v1/payment/success/'+transaction_id,
            fail_url: 'http://localhost:5000/api/v1/payment/fail/'+transaction_id,
            cancel_url: 'http://localhost:3030/cancel',
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: "Computer",
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: 'Customer Name',
            cus_email: 'customer@example.com',
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01711111111',
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };


        let PostBody = {
            user: LoginUserID,
            shippingInfo: shippingInfo,
            orderItems: orderItems,
            totalPrice: totalPrice,
            paidStatus: false,
            transactionID:transaction_id,
        };



        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
        const apiResponse = await sslcz.init(data);

        if(apiResponse){
            let GatewayPageURL = apiResponse.GatewayPageURL;
            const order = await OrderModel.create(PostBody);
            //res.send({url:GatewayPageURL})

            return {status: "success", url: GatewayPageURL, data:order};
            // console.log('Redirecting to: ', GatewayPageURL)
        }

    }
    catch(error) {
        return {status:"fail", data:error};
    }

}

module.exports=CreateOrderWithPaymentService