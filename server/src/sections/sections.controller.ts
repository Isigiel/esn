import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { currentSection, Permission, Profile } from '@esn/server/decorators';
import { SectionsService } from './sections.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  AddSectionMemberDto,
  CreateSectionDto,
  UpdateAboutDto,
} from './section.dto';
import { GlobalPermissions, SectionPermissions } from '@esn/server/shared';
import { User } from '@esn/server/users/user.entity';
import { Section } from '@esn/server/sections/section.entity';

@ApiTags('sections')
@Controller()
export class SectionsController {
  constructor(private sectionsService: SectionsService) {}

  @Get('section')
  getCurrent(@currentSection() section: Section) {
    return section;
  }

  @ApiBearerAuth()
  @Permission(SectionPermissions.SECTION_INFO)
  @Post('section/about')
  updateAbout(
    @currentSection() section: Section,
    @Body() updateAboutDto: UpdateAboutDto,
  ) {
    return this.sectionsService.update({
      ...section,
      about: updateAboutDto.about,
    });
  }

  @ApiBearerAuth()
  @Permission(SectionPermissions.SECTION_MANAGE)
  @Get('sections')
  getAll(@Profile() user: User) {
    return this.sectionsService.getAllForUser(user);
  }

  @ApiBearerAuth()
  @Permission(SectionPermissions.SECTION_MANAGE)
  @Get('section/:sectionId')
  getOne(@Param('sectionId') id: string) {
    return this.sectionsService.getOne(id);
  }

  @ApiBearerAuth()
  @Permission(GlobalPermissions.ADMIN)
  @Post('section')
  createSection(@Body() section: CreateSectionDto) {
    return this.sectionsService.insert(section);
  }

  /*@Post('section/:sectionId/members')
  addMember(
    @Param('sectionId') sectionId: string,
    @Body() dto: AddSectionMemberDto,
  ) {
    return this.sectionsService.addMemberToSection({
      sectionId,
      userId: dto.userId,
    });
  }*/

  @Permission(GlobalPermissions.ADMIN)
  @Delete('section/:sectionId')
  delete(@Param('sectionId') id: string) {
    return this.sectionsService.deleteOne(id);
  }
}
