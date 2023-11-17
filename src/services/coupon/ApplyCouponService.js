const CartModel = require("../../models/Cart/CartModel");
const mongoose = require("mongoose");

const ApplyCouponService = async (Request, CouponModel, CartModel) => {

    let LoginUserID=Request.headers.id;
    const ObjectId = mongoose.Types.ObjectId;
    const couponName = Request.body.name;

     try{


         let CouponData = await CouponModel.aggregate([{$match: {name:couponName}}])
         const Discount = CouponData[0].discount;

         if (CouponData.length > 0) {
             const cartData = await CartModel.aggregate([{$match: {orderBy: new ObjectId(LoginUserID)}}])

             let cartTotal = cartData[0].cartTotal;

             let TotalAfterDiscount = (
                 cartTotal -
                 (cartTotal * Discount) / 100
             ).toFixed(2);

             let CartUpdate = await CartModel.updateOne(
                 {orderBy: new ObjectId(LoginUserID)},
                 {totalAfterDiscount: TotalAfterDiscount}
             )

             return {status: "success", data: CartUpdate}

         }
         else {
             return {status: "fail", data: "Invalid Coupon "}
         }


     }catch (error) {
         return {status: "fail", data: error, result:"false"}
     }
}



module.exports=ApplyCouponService