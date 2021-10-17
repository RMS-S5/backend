const nodemailer = require("nodemailer");
require("dotenv").config();



export default async function sendEmail(toEmail : string, subject : string,  text : string , htmlMsg : string = ""){
    // console.log(process.env.EMAIL_addre)
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    return new Promise((resolve, reject) => {
        transporter.sendMail({
            from: process.env.EMAIL_ADDRESS, // sender address
            to: toEmail, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: htmlMsg, // html body
        }, (err :any, inf :any) => {
            if(err) {
                console.log(err);
                reject({error : true, err})
            }
            resolve({error : false, inf});
        } );
    })

}


