import { PublicationState } from '@esn/shared/publicationState';
import { Type } from 'class-transformer';

export class CreateEsnEvent {
  title: string;
  teaser: string;
  description: string;
  icon: string;
  @Type(() => Date)
  start: Date;
  @Type(() => Date)
  end: Date;
}

export class EsnEvent extends CreateEsnEvent {
  id: string;
  publicationState: PublicationState;
}
