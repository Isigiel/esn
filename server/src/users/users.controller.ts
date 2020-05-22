import { Controller, Get, Req } from '@nestjs/common';

@Controller()
export class UsersController {

  @Get('self')
  currentUser(@Req() request) {
    return { ...request.profile, tennant: request.tennant };
  }
}
