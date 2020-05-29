import { Injectable } from '@nestjs/common';
import { ManagementClient } from 'auth0';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Auth0Service {
  auth0;
  management;

  constructor(private configService: ConfigService) {
    this.management = new ManagementClient({
      clientId: this.configService.get<string>('AUTH_CLIENT_ID'),
      clientSecret: this.configService.get<string>('AUTH_CLIENT_SECRET'),
      domain: this.configService.get<string>('AUTH_DOMAIN'),
    });
  }

  getUser(id) {
    return this.management.users.get({ id });
  }
}
