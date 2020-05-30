import { IsString, IsUUID } from 'class-validator';

export class CreateSectionDto {
  @IsString()
  name: string;
  @IsString()
  esnId: string;
  @IsString()
  esnCode: string;
  @IsString()
  shortCode: string;
  @IsString()
  university: string;
}

export class AddSectionMemberDto {
  @IsUUID()
  userId: string;
}

export class UpdateAboutDto {
  @IsString()
  about: string;
}
