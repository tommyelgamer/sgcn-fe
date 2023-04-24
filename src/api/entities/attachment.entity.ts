import { File } from './file.entity';

export interface Attachment {
  id: number;

  file?: File;
  url?: string;
}
