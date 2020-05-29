import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, EntityManager, Repository } from 'typeorm';
import { Invite } from '@esn/server/invite/invite.entity';
import { User } from '@esn/server/users/user.entity';
import { Section } from '@esn/server/sections/section.entity';

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
}
