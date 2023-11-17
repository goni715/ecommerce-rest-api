const mongoose = require("mongoose");
const DislikeBlogService= async (Request, DataModel) => {

    // Create Transaction Session
    const session = await mongoose.startSession();


    try{

        let blogID = Request.body['blogID'];
        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = {_id: new ObjectId(blogID)};

        //Find the blog which you want to be liked
        let blogData = await DataModel.aggregate([{$match: QueryObject}])

        //Find the Login User
        let LoginUserID=Request.headers.id;

        //find if the user has already disliked the blog
        const alreadyDisLiked = blogData[0].dislikes.find((currentValue)=>currentValue.toString() === LoginUserID.toString());


     //If You want to give the dislike, You give the dislike//,Dislike দিতে চাইলে Dislike দাও
        if (!alreadyDisLiked) {

            // Begin Transaction
            await session.startTransaction();

            //Database Process-01// Data Change
            const UpdateBlog1 = await DataModel.updateOne(QueryObject,{$push: { dislikes: LoginUserID}}, {session})

            //Database Process-02// Data Change
            const UpdateBlog2 = await DataModel.updateOne(QueryObject,{$pull: { likes: LoginUserID}}, {session})

            // Transaction Success
            await session.commitTransaction();
            await session.endSession();

            let blogData = await DataModel.aggregate([{$match: QueryObject}])
            return {status: "success", data: blogData}
        }
        else{
            //Remove Dislike
            const UpdateBlog = await DataModel.updateOne(QueryObject,{
                $pull: { dislikes: LoginUserID },
            })
            let blogData = await DataModel.aggregate([{$match: QueryObject}])
            return {status: "success", data: blogData}

        }


    }
    catch (error) {
        // Roll Back Transaction if Fail
        await session.abortTransaction();
        await session.endSession();
        return {status: "fail", data: error.toString()}
    }
}
module.exports=DislikeBlogService