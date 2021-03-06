import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Section } from '../sections/section.entity';
import { SectionPermissions } from '@esn/shared/section-permissions';
import { User } from '../users/user.entity';

@Entity()
export class SectionMembership {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-array')
  permissions: SectionPermissions[];

  @ManyToOne(
    type => User,
    user => user.memberships,
  )
  user: User;

  @ManyToOne(
    type => Section,
    section => section.memberships,
  )
  section: Section;
}
