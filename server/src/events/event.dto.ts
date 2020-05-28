import { IsDateString, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { PublicationState } from '@esn/server/shared';

export class CreateEventDto {
  @IsString()
  title: string;
  @IsString()
  icon: string;
  @IsString()
  teaser: string;
  @IsString()
  publicationState: PublicationState;
  @IsString()
  description: string;
  @IsDateString()
  start: Date;
  @IsDateString()
  end: Date;
}

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  icon: string;
  @IsOptional()
  @IsString()
  teaser: string;
  @IsOptional()
  @IsString()
  publicationState: PublicationState;
  @IsOptional()
  @IsString()
  description: string;
  @IsOptional()
  @IsDateString()
  start: Date;
  @IsOptional()
  @IsDateString()
  end: Date;
}
