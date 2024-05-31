import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('notifications') // Assuming '/notifications' is the endpoint for sending notifications
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern('notification')
  sendNotification(data: any) {
    console.log('Notification sent:', data);
    return { message: 'Notification sent successfully' }; // Return a response if needed
  }
}
