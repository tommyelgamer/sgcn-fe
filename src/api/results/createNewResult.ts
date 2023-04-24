import axios from 'axios';

import APIConfig from '../config/config';

export interface createNewResultData {
  sailingClass: string;
  url?: string;
  resultFile?: File;
  hideLastResult?: boolean;
}

export const createNewResult = async (
  championshipCode: string,
  resultData: createNewResultData,
) => {
  const formData = new FormData();
  formData.append('sailingClass', resultData.sailingClass);

  if (resultData.url) {
    formData.append('url', resultData.url);
  }

  if (resultData.resultFile) {
    formData.append('file', resultData.resultFile);
  }

  formData.append('hideLastResult', String(resultData.hideLastResult || true));

  const { status } = await axios.post(`${APIConfig.baseUrl}/${championshipCode}/result`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });

  if (status !== 201) {
    throw new Error(`Error ${status} on result creation.`);
  }
};
