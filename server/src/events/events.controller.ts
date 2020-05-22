import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventsService } from './events.service';
import { Permission } from '../decorators/permission.decorator';
import { SectionPermissions } from '@esn/shared/section-permissions';

@Controller()
export class EventsController {
  constructor(private eventsService: EventsService) {
  }

  @Get('events')
  findAll() {
    return this.eventsService.findAll();
  }

  @Get('event/:id')
  findOneById(@Param('id') id: string) {
    return this.eventsService.findOneById(id);
  }

  @Permission(SectionPermissions.EVENTS_MANAGE)
  @Post('event')
  create(@Body() createEventDto: any) {
    return this.eventsService.create(createEventDto);
  }
}
