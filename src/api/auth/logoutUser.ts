import axios from 'axios';

import APIConfig from '../config/config';

export const logoutUser = async () => {
  const { status, data } = await axios.get(`${APIConfig.baseUrl}/auth/logout`, {
    withCredentials: true,
  });

  if (status !== 200) {
    throw new Error(`Error ${status} on logout.`);
  }

  return data;
};
