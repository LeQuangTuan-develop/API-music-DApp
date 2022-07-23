const nodemailer = require('nodemailer')
const { User } = require('../models')

class MailService {
    async sendEmail(req, res, email, title, text) {
        var transporter = nodemailer.createTransport({
            // config mail server
            service: 'gmail',
            auth: {
                user: 'khangaudi442@gmail.com',
                pass: 'vehjckwsxuyqztde',
            },
        })
        var mainOptions = {
            // thiết lập đối tượng, nội dung gửi mail
            from: 'khangaudi442@gmail.com',
            to: email,
            subject: title,
            html: text,
        }
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                console.log(err)
                throw new Error(httpStatus.BAD_REQUEST, err)
            } else {
                console.log('Message sent: ' + info.response)
            }
        })
    }
}

module.exports = new MailService()
