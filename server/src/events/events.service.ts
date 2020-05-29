import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Event } from './event.entity';
import { Section } from '@esn/server/sections/section.entity';
import { User } from '@esn/server/users/user.entity';
import {
  collectPermissions,
  isAllowed,
  PublicationState,
  SectionPermissions,
} from '@esn/server/shared';
import { UpdateEventDto } from '@esn/server/events/event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
  ) {}

  findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  findOneById(id: string): Promise<Event> {
    return this.eventRepository.findOneOrFail(id);
  }

  create(eventData: DeepPartial<Event>): Promise<Event> {
    const event = this.eventRepository.create(eventData);
    return this.eventRepository.save(event);
  }

  findForSection(section: Section, user: User) {
    const permissions = collectPermissions(user, section.shortCode);
    if (!isAllowed(permissions, SectionPermissions.EVENTS_VIEWDRAFTS)) {
      if (
        user.memberships.some((m) => m.section.shortCode === section.shortCode)
      ) {
        return this.eventRepository.find({
          where: [
            { section, publicationState: PublicationState.PUBLIC },
            { section, publicationState: PublicationState.INTERNAL },
          ],
        });
      } else {
        return this.eventRepository.find({
          section,
          publicationState: PublicationState.PUBLIC,
        });
      }
    } else {
      return this.eventRepository.find({
        section,
      });
    }
  }

  update({ id, changes }: { changes: UpdateEventDto; id: string }) {
    const event = this.eventRepository.create(changes);
    return this.eventRepository.save({ ...event, id });
  }
}
