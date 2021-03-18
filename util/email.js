
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
})

module.exports = transporter;

// let mailOptions = {
//     from: 'chimisepro@gmail.com',
//     to: 'chimisepro@gmail.com',
//     subject: 'Nodemailer Project',
//     text: 'Hi from your nodemailer project',
//     html: '<h2>Hi from your nodemailer project</h2> <br> <p>I will love to meet you</p>'

// }

// transporter.sendMail(mailOptions, function(err, data) {
//     if (err) {
//         console.log('Error: ' + err)
//     } else {
//         console.log(data)
//         console.log('Email sent sucessfully')
//     }
// })

