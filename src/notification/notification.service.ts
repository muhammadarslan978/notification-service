import { Injectable } from '@nestjs/common';
@Injectable()
export class NotificationService {
  getHello(): string {
    return 'Hello World!';
  }

  mySuperLongProcessOfUser(data: any) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(`done processing data: ${JSON.stringify(data)}`);
        resolve();
      }, 10000);
    });
  }
}
