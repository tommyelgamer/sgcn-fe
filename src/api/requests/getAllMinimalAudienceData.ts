import axios from 'axios';

import APIConfig from '../config/config';
import { Audience } from '../entities/requests/audience.entity';

export const getAllMinimalAudienceData = async (championshipCode: string): Promise<Audience[]> => {
  const audiences = await axios.get<Audience[]>(
    `${APIConfig.baseUrl}/${championshipCode}/request/audience`,
  );
  if (audiences.status !== 200)
    throw new Error(`Status ${audiences.status} ${audiences.statusText} on audience retrieve`);

  return audiences.data;
};
