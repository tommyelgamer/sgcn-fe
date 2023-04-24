import axios from 'axios';

import APIConfig from '../config/config';

export const deleteDocument = async (championshipCode: string, docId: number) => {
  const { status } = await axios.delete(
    `${APIConfig.baseUrl}/${championshipCode}/document/${docId}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    },
  );

  if (status !== 200) {
    throw new Error(`Error ${status} on document deletion.`);
  }
};
