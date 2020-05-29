import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Permission, Profile } from '@esn/server/decorators';
import { SectionsService } from './sections.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddSectionMemberDto, CreateSectionDto } from './section.dto';
import { GlobalPermissions, SectionPermissions } from '@esn/server/shared';
import { User } from '@esn/server/users/user.entity';

@ApiTags('sections')
@ApiBearerAuth()
@Permission(SectionPermissions.SECTION_MANAGE)
@Controller()
export class SectionsController {
  constructor(private sectionsService: SectionsService) {}
  @Get('sections')
  getAll(@Profile() user: User) {
    return this.sectionsService.getAllForUser(user);
  }
  @Get('section/:sectionId')
  getOne(@Param('sectionId') id: string) {
    return this.sectionsService.getOne(id);
  }
  @Post('section')
  createSection(@Body() section: CreateSectionDto) {
    return this.sectionsService.insert(section);
  }

  @Post('section/:sectionId/members')
  addMember(
    @Param('sectionId') sectionId: string,
    @Body() dto: AddSectionMemberDto,
  ) {
    return this.sectionsService.addMemberToSection({
      sectionId,
      userId: dto.userId,
    });
  }

  @Permission(GlobalPermissions.ADMIN)
  @Delete('section/:sectionId')
  delete(@Param('sectionId') id: string) {
    return this.sectionsService.deleteOne(id);
  }
}
