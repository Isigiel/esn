import { Module } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { MembershipsController } from './memberships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionMembership } from '@esn/server/memberships/section-membership.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SectionMembership])],
  providers: [MembershipsService],
  controllers: [MembershipsController],
})
export class MembershipsModule {}
