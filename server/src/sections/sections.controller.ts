import { Controller, Post } from '@nestjs/common';
import { Permission } from '../decorators/permission.decorator';
import { GlobalPermissions } from '@esn/shared/global-permissions';
import { SectionsService } from './sections.service';

@Controller()
export class SectionsController {
  constructor(private sectionsService: SectionsService) {}
  @Permission(GlobalPermissions.ADMIN)
  @Post('section')
  createSection(section) {
    return this.sectionsService.insert(section);
  }
}
