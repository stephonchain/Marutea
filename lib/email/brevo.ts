import nodemailer from 'nodemailer'

function getTransport() {
  return nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST ?? 'smtp-relay.brevo.com',
    port: Number(process.env.BREVO_SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.BREVO_SMTP_USER,
      pass: process.env.BREVO_SMTP_KEY,
    },
  })
}

interface SendEmailParams {
  to: string
  subject: string
  html: string
  replyTo?: string
}

export async function sendEmail({ to, subject, html, replyTo }: SendEmailParams) {
  const transport = getTransport()
  await transport.sendMail({
    from: process.env.EMAIL_FROM ?? 'contact@marutea.fr',
    to,
    subject,
    html,
    replyTo,
  })
}

export async function sendGiftCardEmail(params: {
  destinataireEmail: string
  code: string
  valeurCents: number
  message?: string
}) {
  const valeur = (params.valeurCents / 100).toFixed(0)
  await sendEmail({
    to: params.destinataireEmail,
    subject: `🎁 Vous avez reçu une carte cadeau Marutea de ${valeur}€`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; background: #F5F0E8; padding: 40px; color: #2C2419;">
        <h1 style="text-align: center; color: #7A8C72; font-weight: normal;">Marutea</h1>
        <p style="text-align: center; font-size: 18px;">Une parenthèse de bien-être vous attend</p>
        <div style="background: #fff; border-radius: 16px; padding: 32px; text-align: center; margin: 24px 0;">
          <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #C4876A;">Carte cadeau</p>
          <p style="font-size: 42px; margin: 8px 0; color: #7A8C72;">${valeur}€</p>
          <p style="font-size: 13px; color: #2C2419aa;">Votre code</p>
          <p style="font-size: 24px; letter-spacing: 3px; font-weight: bold; background: #F5F0E8; padding: 12px; border-radius: 8px;">${params.code}</p>
        </div>
        ${params.message ? `<blockquote style="font-style: italic; border-left: 3px solid #C8B89A; padding-left: 16px;">${params.message}</blockquote>` : ''}
        <p style="text-align: center; font-size: 14px;">
          Présentez ce code lors de votre venue au spa Marutea, à Arcachon.<br/>
          Réservation : <a href="https://marutea.fr/reservation" style="color: #7A8C72;">marutea.fr/reservation</a>
        </p>
      </div>
    `,
  })
}

export async function sendReservationRequestEmail(params: {
  soin: string
  dateSouhaitee: string
  nom: string
  email: string
  telephone?: string
  message?: string
}) {
  const notifyTo =
    process.env.RESERVATION_NOTIFY_EMAIL ??
    process.env.EMAIL_FROM ??
    'contact@marutea.fr'

  await sendEmail({
    to: notifyTo,
    replyTo: params.email,
    subject: `🌿 Demande de réservation — ${params.soin}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #2C2419;">
        <h2 style="color: #7A8C72;">Nouvelle demande de réservation</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold;">Soin</td><td>${params.soin}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Date souhaitée</td><td>${params.dateSouhaitee}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Nom</td><td>${params.nom}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Email</td><td>${params.email}</td></tr>
          ${params.telephone ? `<tr><td style="padding: 8px 0; font-weight: bold;">Téléphone</td><td>${params.telephone}</td></tr>` : ''}
        </table>
        ${params.message ? `<p style="margin-top: 16px;"><strong>Message :</strong><br/>${params.message}</p>` : ''}
      </div>
    `,
  })
}
