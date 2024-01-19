import { MailerService } from '@nestjs-modules/mailer';
import { IAuthResponse } from 'src/auth/auth.interface';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendEmail(to: string, resetToken: IAuthResponse): Promise<void>;
}
