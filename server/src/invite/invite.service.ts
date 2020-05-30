import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, EntityManager, Repository } from 'typeorm';
import { Invite } from '@esn/server/invite/invite.entity';
import { User } from '@esn/server/users/user.entity';
import { Section } from '@esn/server/sections/section.entity';
import { SectionMembership } from '@esn/server/memberships/section-membership.entity';

@Injectable()
export class InviteService {
  constructor(
    @InjectRepository(Invite) private inviteRepository: Repository<Invite>,
    @InjectEntityManager() private entityManager: EntityManager,
  ) {}

  async insert(
    invite: DeepPartial<Invite>,
    sectionId: string,
  ): Promise<Invite> {
    const section = await this.entityManager.findOne(Section, sectionId);
    const inviteEntity = this.inviteRepository.create({ ...invite, section });
    return this.inviteRepository.save(inviteEntity);
  }

  findOne(id: string) {
    return this.inviteRepository.findOne(id, {
      relations: ['section', 'creator', 'claimer'],
    });
  }

  async useInvite({ id, user }: { id: string; user: User }) {
    const invite = await this.findOne(id);
    if (invite.claimer) {
      throw new BadRequestException(invite, 'This invite was already used!');
    }
    const existingMembership = await this.entityManager.findOne(
      SectionMembership,
      { section: invite.section, user },
    );
    invite.claimer = user;
    await this.inviteRepository.save(invite);
    if (existingMembership) {
      const newPermissions = new Set([
        ...existingMembership.permissions,
        ...invite.permissions,
      ]);
      const updatedMembership = this.entityManager.create(SectionMembership, {
        ...existingMembership,
        permissions: Array.from(newPermissions),
      });
      return this.entityManager.save(updatedMembership);
    }
    const newMembership = this.entityManager.create(SectionMembership, {
      user,
      permissions: invite.permissions,
      section: invite.section,
    });
    return this.entityManager.save(newMembership);
  }
}
