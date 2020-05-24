import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GlobalPermissions } from '@esn/shared/global-permissions';
import { SectionMembership } from '../memberships/section-membership.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
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
  email_verified: boolean;

  @Column({ type: 'simple-array' })
  permissions: GlobalPermissions[];

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(
    type => SectionMembership,
    membership => membership.user,
  )
  memberships: SectionMembership[];
}
