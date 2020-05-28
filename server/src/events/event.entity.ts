import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Section } from '../sections/section.entity';
import { PublicationState } from '@esn/server/shared';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  icon: string;

  @Column('ntext')
  teaser: string;

  @Column('ntext')
  description: string;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column({ default: PublicationState.DRAFT })
  publicationState: PublicationState;

  @ManyToOne((type) => Section, (section) => section.events)
  section: Section;
}
