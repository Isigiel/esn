import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Permission } from '../decorators/permission.decorator';
import { GlobalPermissions } from '@esn/shared/global-permissions';
import { SectionsService } from './sections.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddSectionMemberDto, CreateSectionDto } from './section.dto';

@ApiTags('sections')
@ApiBearerAuth()
@Permission(GlobalPermissions.ADMIN)
@Controller()
export class SectionsController {
  constructor(private sectionsService: SectionsService) {}
  @Get('sections')
  getAll() {
    return this.sectionsService.getAll();
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

  @Delete('section/:sectionId')
  delete(@Param('sectionId') id: string) {
    return this.sectionsService.deleteOne(id);
  }
}
