import { Attachment } from './attachment.entity';

export interface Document {
  id: number;

  title: string;
  publishdate: string;
  attachment: Attachment;

  championship_id: number;
}
