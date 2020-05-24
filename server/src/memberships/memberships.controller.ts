import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Permission } from '@esn/server/decorators';
import { GlobalPermissions } from '@esn/shared/global-permissions';
import { MembershipsService } from '@esn/server/memberships/memberships.service';
import { UpdateMembershipDto } from '@esn/server/memberships/membership.dto';

@ApiTags('memberships')
@ApiBearerAuth()
@Permission(GlobalPermissions.ADMIN)
@Controller()
export class MembershipsController {
  constructor(private membershipsService: MembershipsService) {}
  @Put('membership/:membershipId')
  updateMembership(
    @Param('membershipId') membershipId: string,
    @Body() membershipUpdate: UpdateMembershipDto,
  ) {
    return this.membershipsService.update({
      ...membershipUpdate,
      id: membershipId,
    });
  }
}
