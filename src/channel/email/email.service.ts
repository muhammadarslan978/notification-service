import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendEmail(data: any): Promise<void> {
    const msg = {
      to: data.to,
      from: process.env.EMAIL, // Use the email address or domain you verified with SendGrid
      subject: data.subject,
      html: data.html,
    };

    try {
      await sgMail.send(msg);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw new InternalServerErrorException('Failed to send email');
    }
  }
}
