import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SectionMembership } from './section-membership.entity';
import { Event } from '../events/event.entity';

@Entity()
export class Section {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  shortCode: string;

  @Column({ unique: true })
  esnCode: string;

  @Column({ unique: true })
  esnId: string;

  @Column()
  university: string;

  @OneToMany((type) => SectionMembership, (membership) => membership.section)
  memberships: SectionMembership[];

  @OneToMany((type) => Event, (event) => event.section)
  events: Event[];
}
