import { createTransport } from 'nodemailer'

const transporter = createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: Number(process.env.BREVO_SMTP_PORT) || 587,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_KEY,
  },
})

interface SendEmailParams {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  return transporter.sendMail({
    from: process.env.EMAIL_FROM || 'contact@marutea.fr',
    to,
    subject,
    html,
  })
}
