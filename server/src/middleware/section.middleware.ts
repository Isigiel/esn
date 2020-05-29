import { Injectable, NestMiddleware } from '@nestjs/common';
import { SectionsService } from '@esn/server/sections/sections.service';

@Injectable()
export class SectionMiddleware implements NestMiddleware {
  constructor(private sectionsService: SectionsService) {}

  use(req: any, res: any, next: () => void) {
    if (!!req.profile && !!req.profile.memberships) {
      const membership = req.profile.memberships.find(
        (m) => m.section.shortCode === req.tenant,
      );
      if (!!membership) {
        req.section = membership.section;
        next();
        return;
      }
    }
    if (!!req.tenant) {
      this.sectionsService.getOneByShortCode(req.tenant).then((section) => {
        req.section = section;
        next();
      });
    } else {
      next();
    }
  }
}
