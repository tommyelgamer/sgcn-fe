import axios from 'axios';

import APIConfig from '../config/config';

export interface loginUserData {
  championshipId: number;
  username: string;
  password: string;
}

export const loginUser = async (loginData: loginUserData) => {
  const { status, data } = await axios.post(`${APIConfig.baseUrl}/auth/login`, loginData, {
    withCredentials: true,
  });

  if (status !== 200) {
    throw new Error(`Error ${status} on login.`);
  }

  return data;
};
