import { HttpService, Injectable, NestMiddleware } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { assign, pick } from 'lodash';

@Injectable()
export class ProfileMiddleware implements NestMiddleware {
  constructor(
    private usersService: UsersService,
    private httpService: HttpService
  ) {}

  async use(req: any, res: any, next: () => void) {
    if (!!req.user) {
      const profile =
        (await this.usersService.findOneByLoginId(req.user.sub)) ??
        this.usersService.getNew();
      if (!profile.email_verified) {
        const { data }: any = await this.httpService
          .get('https://tumi.eu.auth0.com/userinfo', {
            headers: { Authorization: req.header('Authorization') },
            responseType: 'json',
          })
          .toPromise();
        assign(
          profile,
          pick(data, ['name', 'picture', 'email', 'email_verified']),
          {
            loginId: data.sub,
            permissions:
              req.user['http://esn.events/app_metadata']?.permissions ?? [],
          }
        );
        assign(profile, await this.usersService.save(profile));
      }
      req.profile = profile;
    }
    next();
  }
}
