import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventsService } from './events.service';
import { Permission } from '@esn/server/decorators';
import { SectionPermissions } from '@esn/shared/section-permissions';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateEventDto } from './event.dto';

@ApiTags('events')
@Controller()
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get('events')
  findAll() {
    return this.eventsService.findAll();
  }

  @Get('event/:eventId')
  findOneById(@Param('eventId') id: string) {
    return this.eventsService.findOneById(id);
  }

  @Permission(SectionPermissions.EVENTS_MANAGE)
  @ApiBearerAuth()
  @Post('event')
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }
}
