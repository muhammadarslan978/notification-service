import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/channel/email/email.service';
import { EVENT_ENUM, QUEUE_EVENT, SIGNUP_EMAIL_TYPE } from 'src/constants';

@Injectable()
export class NotificationService {
  constructor(
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async sendNotification(payload: QUEUE_EVENT): Promise<void> {
    try {
      console.log('Received payload:', payload);

      if (payload.type === EVENT_ENUM.EMAIL) {
        const { data } = payload;

        if (!data.email || !data.fullName || !data.token) {
          throw new HttpException(
            'Invalid email payload data',
            HttpStatus.BAD_REQUEST,
          );
        }

        const emailData: SIGNUP_EMAIL_TYPE = {
          to: data.email,
          subject: 'Welcome to Mobio',
          html: `<p><b>Hi ${data.fullName},</b></p><br/><p>Thank you for registering with Mobio. Please <a href="${this.configService.get<string>(
            'URL',
          )}/user/verify/${data.token}">verify</a> your account to access your account. Note that this link will expire after 5 hours.</p><br/><p><b>Regards,</b></p><p>Team Mobio</p>`,
        };

        await this.emailService.sendEmail(emailData);
      } else {
        throw new HttpException(
          `Unsupported event type: ${payload.type}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      console.error('Error sending notification:', err.message);
      throw new HttpException(
        `Failed to send notification: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
