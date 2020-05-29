import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { Permission, Profile, currentSection } from '@esn/server/decorators';
import { SectionPermissions } from '@esn/shared/section-permissions';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateEventDto, UpdateEventDto } from './event.dto';
import { Section as SectionEntity } from '@esn/server/sections/section.entity';
import { User } from '@esn/server/users/user.entity';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  findAll(@Profile() user: User, @currentSection() section: SectionEntity) {
    return this.eventsService.findForSection(section, user);
  }

  @Get(':eventId')
  findOneById(@Param('eventId') id: string) {
    return this.eventsService.findOneById(id);
  }

  @Permission(SectionPermissions.EVENTS_MANAGE)
  @ApiBearerAuth()
  @Post()
  create(
    @Body() createEventDto: CreateEventDto,
    @currentSection() section: SectionEntity,
  ) {
    return this.eventsService.create({ ...createEventDto, section });
  }
  @Permission(SectionPermissions.EVENTS_MANAGE)
  @ApiBearerAuth()
  @Patch(':eventId')
  updateEvent(
    @Param('eventId') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.update({ id, changes: updateEventDto });
  }
}
