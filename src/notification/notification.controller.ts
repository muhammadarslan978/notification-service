import { Controller, Post, Body } from '@nestjs/common';
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
  public async execute(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();

    console.log('data', data);
    await this.notificationService.mySuperLongProcessOfUser(data);

    channel.ack(orginalMessage);
  }
}
