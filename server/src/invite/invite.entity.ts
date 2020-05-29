import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SectionPermissions } from '@esn/server/shared';
import { Section } from '@esn/server/sections/section.entity';
import { User } from '@esn/server/users/user.entity';

@Entity()
export class Invite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-array')
  permissions: SectionPermissions[];

  @Column()
  email: string;

  @ManyToOne((type) => Section, (section) => section.invites)
  section: Section;

  @ManyToOne((type) => User, (user) => user.createdInvites)
  creator: User;

  @ManyToOne((type) => User, (user) => user.claimedInvites)
  claimer: User;
}
