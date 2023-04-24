import axios from 'axios';

import APIConfig from '../config/config';
import { Document } from '../entities/document.entity';

export const getAllDocuments = async (championshipCode: string): Promise<Document[]> => {
  const documents = await axios.get<Document[]>(
    `${APIConfig.baseUrl}/${championshipCode}/document`,
  );
  if (documents.status !== 200)
    throw new Error(`Status ${documents.status} ${documents.statusText} on documents retrieve`);

  return documents.data;
};
