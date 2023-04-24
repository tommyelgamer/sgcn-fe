import { Attachment } from './attachment.entity';

export interface Result {
  id: number;

  sailingClass: string;
  publishdate: string;
  attachment: Attachment;

  isHidden: boolean;

  championshipId: number;
}
