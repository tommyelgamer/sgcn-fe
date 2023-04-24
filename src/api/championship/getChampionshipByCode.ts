import axios from 'axios';

import APIConfig from '../config/config';
import { Championship } from '../entities/championship.entity';

const getChampionshipByCode = async (code: string): Promise<Championship> => {
  const championships = await axios.get<Championship>(`${APIConfig.baseUrl}/championship/${code}`);
  if (championships.status !== 200)
    throw new Error(
      `Status ${championships.status} ${championships.statusText} on championships retrieve`,
    );

  return championships.data;
};

export default getChampionshipByCode;
