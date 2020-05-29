import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Invite } from '@esn/server/invite/invite.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sgMail = require('@sendgrid/mail');
@Injectable()
export class MailsService {
  sgMail;
  constructor(private configService: ConfigService) {
    sgMail.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
  }
  sendInvite(invite: Invite, link: string) {
    const msg = {
      to: invite.email,
      from: 'esn.world <noreply@esn.world>',
      subject: '[esn.world] section invitation',
      // eslint-disable-next-line @typescript-eslint/camelcase
      template_id: 'd-74374a7de43b4472bfe8afd92a77043a',
      // eslint-disable-next-line @typescript-eslint/camelcase
      dynamic_template_data: { ...invite, link },
    };
    sgMail.send(msg).catch(({ response }) => console.error(response.body));
  }
}
