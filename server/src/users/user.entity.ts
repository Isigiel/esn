import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GlobalPermissions } from '@esn/shared/global-permissions';
import { SectionMembership } from '../memberships/section-membership.entity';
import { Invite } from '@esn/server/invite/invite.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  loginId: string;

  // @Column({ default: '' })
  // firstName: string;

  // @Column({ default: '' })
  // lastName: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  picture: string;

  @Column()
  emailVerified: boolean;

  @Column({ type: 'simple-array' })
  permissions: GlobalPermissions[];

  @Column({ default: true })
  isActive: boolean;

  @UpdateDateColumn()
  lastUpdate: Date;

  @OneToMany((type) => SectionMembership, (membership) => membership.user)
  memberships: SectionMembership[];

  @OneToMany((type) => Invite, (invite) => invite.creator)
  createdInvites: Invite[];

  @OneToMany((type) => Invite, (invite) => invite.claimer)
  claimedInvites: Invite[];
}
