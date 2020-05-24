import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { GlobalPermissions } from '@esn/shared/global-permissions';
import { UsersService } from './users.service';
import { Permission } from '@esn/server/decorators';

@ApiTags('users')
@ApiBearerAuth()
@Controller()
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get('self')
  currentUser(@Req() request): User & { tenant: string } {
    return { ...request.profile, tenant: request.tenant };
  }
  @Get('users')
  @Permission(GlobalPermissions.ADMIN)
  searchUsers(@Query() query): Promise<User[]> {
    if (query.search) {
      return this.userService.search(query.search);
    } else {
      return this.userService.findAll();
    }
  }
}
