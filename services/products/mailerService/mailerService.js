const nodemailer = require('nodemailer')

class MailingService {
    constructor(){
        this.transport = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD
            }
        })
    }
}

const mailerService = new MailingService()

module.exports = mailerService