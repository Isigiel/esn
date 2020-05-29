import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SectionMembership } from '../memberships/section-membership.entity';
import { Event } from '../events/event.entity';
import { Invite } from '@esn/server/invite/invite.entity';

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

  @OneToMany((type) => Invite, (invite) => invite.section)
  invites: Invite[];
}
