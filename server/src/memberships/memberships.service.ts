import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { SectionMembership } from '@esn/server/memberships/section-membership.entity';

@Injectable()
export class MembershipsService {
  constructor(
    @InjectRepository(SectionMembership)
    private membershipRepository: Repository<SectionMembership>,
  ) {}
  async update(
    membership: DeepPartial<SectionMembership>,
  ): Promise<SectionMembership> {
    await this.membershipRepository.save(membership);
    return await this.membershipRepository.findOne(membership.id, {
      relations: ['section', 'section.memberships', 'section.memberships.user'],
    });
  }
}
