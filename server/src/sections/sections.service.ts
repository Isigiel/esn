import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Section } from './section.entity';
import { DeepPartial, EntityManager, Repository } from 'typeorm';
import { SectionMembership } from '@esn/server/memberships/section-membership.entity';
import { User } from '@esn/server/users/user.entity';
import { GlobalPermissions, SectionPermissions } from '@esn/server/shared';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Section) private sectionRepository: Repository<Section>,
    @InjectEntityManager() private entityManager: EntityManager,
  ) {}
  insert(section: DeepPartial<Section>): Promise<Section> {
    this.sectionRepository.create(section);
    return this.sectionRepository.save(section);
  }

  async getAllForUser(user: User): Promise<Section[]> {
    if (user.permissions.includes(GlobalPermissions.ADMIN)) {
      return await this.sectionRepository.find();
    }
    return user.memberships
      .filter((m) => m.permissions.includes(SectionPermissions.SECTION_MANAGE))
      .map((m) => m.section);
  }
  getOne(id: string, relations = ['memberships', 'memberships.user']) {
    return this.sectionRepository.findOne(id, { relations });
  }
  async addMemberToSection({ userId, sectionId }): Promise<Section> {
    const user = await this.entityManager.findOne(User, userId);
    const section = await this.sectionRepository.findOne(sectionId);
    await this.entityManager.insert(SectionMembership, {
      section,
      user,
      permissions: [],
    });
    return await this.getOne(sectionId);
  }
  deleteOne(id: string) {
    return this.sectionRepository.delete(id);
  }

  getOneByShortCode(shortCode: string) {
    return this.sectionRepository.findOneOrFail({ shortCode });
  }
}
