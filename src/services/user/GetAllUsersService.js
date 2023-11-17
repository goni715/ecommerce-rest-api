
const GetAllUsersService= async (Request,DataModel) => {

    try {
        let data =await DataModel.aggregate([
            {$project:{_id:1, firstName:1, lastName:1,email:1,mobile:1,role:1, isBlocked:1,cart:1, address:1, wishlist:1, refreshToken:1, createdAt:1}}
        ]);
        return  {status: "success", data: data}
    } catch (error) {
        return {status: "fail", data: error}
    }
}
module.exports=GetAllUsersService