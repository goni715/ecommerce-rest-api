const nodemailer = require('nodemailer');

const SendEmailUtility= async (EmailTo, EmailText, EmailSubject) => {

    try{
        //transporter
        let transporter = await nodemailer.createTransport({
            host: "mail.teamrabbil.com",
            port: 587,
            secure: false,
            auth: {
                user: "info@teamrabbil.com",
                pass: '~sR4[bhaC[Qs'
            },
            tls: {
                rejectUnauthorized: false
            }
        })

	
	
       let mailOptions = {
           from: 'Ecommerce MERN <info@teamrabbil.com>',
           to: EmailTo,
           subject: EmailSubject,
           text: EmailText
       };


	    return  await transporter.sendMail(mailOptions)
	}
	catch{
		return "request fail"
	}

}
module.exports=SendEmailUtility
