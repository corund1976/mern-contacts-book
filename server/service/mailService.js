import nodemailer from 'nodemailer'

const sendVerifyMail = async (to, link) => {
  const config = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  }

  const transporter = nodemailer.createTransport(config)

  const emailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject: 'Активация аккаунта на ' + process.env.API_URL,
    text: '',
    html: `
        <div>
          <h1>Для активации перейдите по ссылке:</h1>
          <a href='${link}'>${link}</a>
        </div>`
  }

  return await transporter.sendMail(emailOptions)
}

export default sendVerifyMail