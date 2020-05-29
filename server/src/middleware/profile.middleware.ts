import { HttpService, Injectable, NestMiddleware } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { assign, pick } from 'lodash';
import { add, isBefore, sub } from 'date-fns';
import { Auth0Service } from '@esn/server/services/auth0.service';
import { MailsService } from '@esn/server/services/mails.service';

@Injectable()
export class ProfileMiddleware implements NestMiddleware {
  constructor(
    private usersService: UsersService,
    private auth0Service: Auth0Service,
    ms: MailsService,
  ) {}

  async use(req: any, res: any, next: () => void) {
    if (!!req.user) {
      const profile =
        (await this.usersService.findOneByLoginId(req.user.sub)) ??
        this.usersService.getNew();
      if (
        !profile.lastUpdate ||
        isBefore(profile.lastUpdate, sub(new Date(), { hours: 3 }))
      ) {
        const user = await this.auth0Service.getUser(req.user.sub);
        assign(profile, pick(user, ['name', 'picture', 'email']), {
          loginId: user.user_id,
          emailVerified: user.email_verified,
          permissions:
            req.user['http://esn.events/app_metadata']?.permissions ?? [],
        });
        let savedProfile;
        try {
          savedProfile = await this.usersService.save(profile);
        } catch (e) {
          savedProfile = await this.usersService.findOneByLoginId(user.user_id);
        }
        assign(profile, savedProfile);
      }
      req.profile = profile;
    }
    next();
  }
}
