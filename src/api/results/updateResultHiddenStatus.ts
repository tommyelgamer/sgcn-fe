import axios from 'axios';

import APIConfig from '../config/config';

export const updateResultHiddenStatus = async (
  championshipCode: string,
  id: number,
  isHiddenValue: boolean,
) => {
  const { status } = await axios.patch(
    `${APIConfig.baseUrl}/${championshipCode}/result/sethidden/${id}`,
    {
      setHidden: isHiddenValue,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    },
  );

  if (status !== 200) {
    throw new Error(`Error ${status} on result update.`);
  }
};
