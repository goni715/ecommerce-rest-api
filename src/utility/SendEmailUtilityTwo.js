const nodemailer = require('nodemailer');

const SendEmailUtilityTwo= async (EmailTo, EmailText, EmailSubject, ResetURL) => {

    try{

       //transporter
       let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: process.env.NODE_ENV === "production" ? 465 : 587, //secure:true for 465, false for other port 
        secure: process.env.NODE_ENV === "production",
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD
        }
     })



        let mailOptions = {
             from: `Ecommerce MERN ${process.env.SMTP_FROM}`,
            to: EmailTo,
            subject: EmailSubject,
            text: EmailText,
            html: ResetURL, // html body
        };


        return  await transporter.sendMail(mailOptions)
    }
    catch{
        return "request fail"
    }
}
module.exports=SendEmailUtilityTwo
