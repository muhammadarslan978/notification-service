import { Controller } from '@nestjs/common';
import { NotificationService } from './notification.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller('notifications') // Assuming '/notifications' is the endpoint for sending notifications
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern('rabbit-mq-producer')
  public async execute(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      await this.notificationService.sendNotification(data);
      channel.ack(originalMessage);
    } catch (error) {
      console.error('Error processing message:', error.message);
      // Optionally handle message rejection or requeue logic here
    }
  }
}
