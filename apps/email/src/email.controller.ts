import { Controller, UseInterceptors } from '@nestjs/common';
import { EmailService } from './email.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { SendEmailDto } from './send-email.dto';
import { RmqLoggingInterceptor } from '@app/interceptors/rmq-logging.interceptor';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @EventPattern('email_requested')
  @UseInterceptors(RmqLoggingInterceptor)
  sendEmail(@Payload() data: SendEmailDto, @Ctx() context: RmqContext) {
    this.emailService.send(data);

    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }
}
