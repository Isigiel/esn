import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>
  ) {}

  findAll() {
    return this.eventRepository.find();
  }

  findOneById(id: string) {
    return this.eventRepository.findOne(id);
  }

  async create(eventData: any) {
    const event = this.eventRepository.create(eventData);
    return await this.eventRepository.save(event);
  }
}
