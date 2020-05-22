import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from './section.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Section) private sectionRepository: Repository<Section>
  ) {}
  insert(section: DeepPartial<Section>) {
    return this.sectionRepository.insert(section);
  }
}
