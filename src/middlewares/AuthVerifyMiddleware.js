require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports=(req,res,next)=>{
    let Token=req.headers['token'];
    jwt.verify(Token,process.env.SECRET_KEY,function (err,decoded) {
        if(err){
            //console.log(Token)
            res.status(401).json({message:"unauthorized", data:"Token invalid"})
        }
        else {
            let data =decoded['data'];
            //console.log(data.email)
            //console.log(data.id);
            req.headers.email= data.email;
            req.headers.id= data.id;
            next()
        }
    })
}
