import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { AuthResponse } from 'src/interfaces/auth.interface'

@Injectable()
export class MailService {
	constructor(private readonly mailerService: MailerService) {}

	public async sendEmail(to: string, resetToken: AuthResponse) {
		const resetLink = `${process.env.CLIENT_HOST}/reset-password/${resetToken.accessToken}`
		console.log('resetLink --> ', resetLink)

		const email = {
			from: process.env.EMAIL_ADMIN,
			to: to,
			subject: 'Reestablecer Contraseña',
			html: `
        <h2>Restablecimiento de contraseña</h2>
        <p>Hola ${to}!</p>
        <p>Para restablecer su contraseña, haga clic en el siguiente enlace:</p>
        <a href=${resetLink}>Restablecer contraseña</a>
        <p>Este enlace solo será válido durante 24 horas.</p>
        <p>Si no solicitó restablecer su contraseña, ignore este correo electrónico.</p>
        <h4>¡Muchas gracias!</h4>`,
		}

		await this.mailerService.sendMail(email)
	}
}
