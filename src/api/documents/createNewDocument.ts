import axios from 'axios';

import APIConfig from '../config/config';

export interface createNewDocumentData {
  title: string;
  url?: string;
  documentFile?: File;
}

export const createNewDocument = async (
  championshipCode: string,
  docsData: createNewDocumentData,
) => {
  const formData = new FormData();
  formData.append('title', docsData.title);

  if (docsData.url) {
    formData.append('url', docsData.url);
  }

  if (docsData.documentFile) {
    formData.append('file', docsData.documentFile);
  }

  const { status } = await axios.post(
    `${APIConfig.baseUrl}/${championshipCode}/document`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    },
  );

  if (status !== 201) {
    throw new Error(`Error ${status} on document creation.`);
  }
};
