import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Permission, Profile, currentSection } from '@esn/server/decorators';
import { SectionPermissions } from '@esn/server/shared';
import { InviteService } from '@esn/server/invite/invite.service';
import { CreateInviteDto } from '@esn/server/invite/invite.dto';
import { User } from '@esn/server/users/user.entity';
import { Section } from '@esn/server/sections/section.entity';
import { MailsService } from '@esn/server/services/mails.service';

@ApiTags('invites')
@Controller('invite')
export class InviteController {
  constructor(
    private inviteService: InviteService,
    private mailsService: MailsService,
  ) {}

  @Get(':inviteId')
  findOne(@Param('inviteId') id: string) {
    return this.inviteService.findOne(id);
  }

  @Post(':inviteId')
  claimInvite(@Param('inviteId') id: string, @Profile() user: User) {
    return this.inviteService.useInvite({ id, user });
  }

  @ApiBearerAuth()
  @Permission(SectionPermissions.SECTION_MANAGE)
  @Post()
  async createInvites(
    @Body() createInviteDto: CreateInviteDto,
    @Profile() creator: User,
    @Req() req: any,
  ) {
    return await Promise.all(
      createInviteDto.emails.map((email) =>
        this.inviteService
          .insert(
            {
              creator,
              email,
              permissions: createInviteDto.permissions,
            },
            createInviteDto.sectionId,
          )
          .then((invite) =>
            this.mailsService.sendInvite(
              invite,
              `${req.protocol}://${req.hostname}${
                req.hostname == 'localhost' ? ':4200' : ''
              }/invite/${invite.id}`,
            ),
          ),
      ),
    );
  }
}
