import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { IAuthResponse } from 'src/auth/auth.interface'

@Injectable()
export class MailService {
	constructor(private readonly mailerService: MailerService) {}

	public async sendEmail(
		userName: string,
		to: string,
		resetToken: IAuthResponse
	) {
		const resetLink = `${process.env.CLIENT_HOST}/reset-password/${resetToken.accessToken}`

		const email = {
			from: process.env.EMAIL_ADMIN,
			to: to,
			subject: 'Reestablecer Contraseña - BOX app',
			html: `
      <html>
				<head>
					<style>
						.container {
							max-width: 600px;
							margin: 0 auto;
							padding: 20px;
							background-color: #ffffff;
							box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
							border-radius: 10px;
						}
						h2 {
							color: #333333;
						}
						p {
							color: #666666;
						}
						a {
							color: #007bff;
							text-decoration: none;
						}
						h4 {
							color: #333333;
						}
						img {
							max-width: 100%;
							height: auto;
						}
					</style>
				</head>
				<body style="font-family: 'Arial', sans-serif; background-color: #80CF8B; padding: 20px 0">
					<div class="container">
					<img src="cid:boxLogo" alt="Box Delivery App" width="100">
						<h2>Restablecimiento de contraseña</h2>
						<p>Hola ${userName}!</p>
						<p>Para restablecer su contraseña, haga clic en el siguiente enlace:</p>
						<a href=${resetLink}>Restablecer contraseña</a>
						<p>Este enlace solo será válido durante 24 horas.</p>
						<p>Si no solicitó restablecer su contraseña, ignore este correo electrónico.</p>
						<h4>¡Muchas gracias!</h4>
						<h4>Equipo Box</h4>
					</div>
				</body>
			</html>  
			`,
			attachments: [
				{
					filename: 'boxlogo.png',
					path: './assets/boxlogo.png',
					cid: 'boxLogo',
				},
			],
		}

		await this.mailerService.sendMail(email)
	}
}
