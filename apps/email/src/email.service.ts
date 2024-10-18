import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './send-email.dto';

@Injectable()
export class EmailService {
  send(form: SendEmailDto) {
    console.log('Mailer:', form);
  }
}
