//Basic Import
require('dotenv').config();
const express = require('express');
const app = new express();
const router = require('./src/routes/api');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");



//Security Middleware Import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const morgan = require("morgan");
const cors = require('cors');

//Database Library Import
const mongoose = require('mongoose');


//Security Middleware Implementation
app.use(morgan("dev"));
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())
app.use(cors())

//RequestBodySizeIncrease
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

//Body Parser Implementation
app.use(bodyParser.json());
app.use(cookieParser());



//Request Rate Limit Implementation
const Limiter = rateLimit({
      windowMs: 15 * 60 * 1000,   //15 Minutes
      max: 300000000   //Limit each IP to 100 requests per windowMs
})
app.use(Limiter);



//MongoDB(mongoose) Atlas Database Connection
let uri = process.env.URI;
let option = {user:process.env.USER_NAME, pass:process.env.PASS_WORD,autoIndex:true};

 const connection = mongoose.connect(uri, option);
   if(connection){
       console.log("connection success");
   }else{
       console.log("connection failed")
       console.log(JSON.stringify(connection))
   }


   //mongoose version 7 এ mongoose connect এ কোন callback function নেই






//Managing Back-end Routing// Back-end Routing Implementation
app.use('/api/v1', router);


app.get('/', (req,res)=> {
    res.send('This is Ecommerce Server');
})


//Undefined Route
app.use('*',(req,res)=>{
      res.status(404).json({status:"Fail", data:"Not Found"});
});


module.exports=app;