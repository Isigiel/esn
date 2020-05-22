import { Module } from '@nestjs/common';
import { SectionsController } from './sections.controller';
import { SectionsService } from './sections.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from './section.entity';
import { SectionMembership } from './section-membership.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Section, SectionMembership])],
  controllers: [SectionsController],
  providers: [SectionsService]
})
export class SectionsModule {}
