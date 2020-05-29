import { Module } from '@nestjs/common';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from '@esn/server/sections/section.entity';
import { MailsService } from '@esn/server/services/mails.service';
import { Invite } from '@esn/server/invite/invite.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Invite]), ConfigModule],
  providers: [InviteService, MailsService],
  controllers: [InviteController],
})
export class InviteModule {}
