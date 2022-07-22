const nodemailer = require('nodemailer')
const { User } = require('../models')


class MailService{
    
    randomString(){
        const result = Math.random().toString(36).substring(2,12);
        console.log(result);
        return result
    }

    async updateUserByEmail(email, body) {
        const user = await User.findByPk(id)
        if (!user)
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This user does not exist'
            )

        Object.keys(body).forEach((key) => {
            console.log(body[key])
            user[key] = body[key]
        })
        await user.save()
        return user
    }

    
    async sendEmail(req, res, email, title, text) {
        var transporter =  nodemailer.createTransport({ // config mail server
            service: 'gmail',
            auth: {
                user: 'khangaudi442@gmail.com',
                pass: 'vehjckwsxuyqztde'
            }
        });
        var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'khangaudi442@gmail.com',
            to: email,
            subject: title,
            html: text
        }
        transporter.sendMail(mainOptions, function(err, info){
            if (err) {
                console.log(err);
                throw new Error(
                    httpStatus.BAD_REQUEST,
                    err
                )
            } else {
                console.log('Message sent: ' +  info.response);
                
            }
        });
    }

    async getUserByEmail(email) {
        const user = await User.findOne({ where: { email: email } })
        if (!user) {
            throw new ApiError(
                httpStatus.UNAUTHORIZED,
                'Incorrect email'
            )
        }
        return user
    }

    async updateUserByEmail(email, body) {
        const user = await User.findOne({ where: { email: email } })
        if (!user)
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This user does not exist'
            )

        Object.keys(body).forEach((key) => {
            console.log(body[key])
            user[key] = body[key]
        })
        await user.save()
        return user
    }

}

module.exports = new MailService()
