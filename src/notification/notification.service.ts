import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EmailService } from 'src/channel/email/email.service';
@Injectable()
export class NotificationService {
  constructor(private readonly emailService: EmailService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async sendNotification(payload: any) {
    try {
      console.log('Received payload:', payload);

      if (payload.type === 'EMAIL') {
        const { data } = payload;

        const emailData = {
          to: data.email,
          subject: 'Welcome to Mobio',
          html: `<p><b>Hi ${data.fullName},</b></p><br/><p>Thank you for registering with Mobio. Please <a href="${process.env.URL}/user/verify/${data.token}">verify</a> your account to access your account. Note that this link will expire after 5 hours.</p><br/><p><b>Regards,</b></p><p>Team Mobio</p>`,
        };
        await this.emailService.sendEmail(emailData);
      }
    } catch (err) {
      console.error('Error sending notification:', err);
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
