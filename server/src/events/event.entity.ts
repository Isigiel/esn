import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Section } from '../sections/section.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  teaser_text: string;

  @Column()
  description: string;

  @Column('date')
  start: Date;

  @ManyToOne(
    type => Section,
    section => section.events,
  )
  section: Section;
}
