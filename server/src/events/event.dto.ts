import { IsDateString, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;
  @IsString()
  teaserText: string;
  @IsString()
  description: string;
  @IsDateString()
  start: Date;
}
