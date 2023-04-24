import axios from 'axios';

import APIConfig from '../config/config';
import { Result } from '../entities/result.entity';

export const getAllResultsWithHidden = async (championshipCode: string): Promise<Result[]> => {
  const results = await axios.get<Result[]>(
    `${APIConfig.baseUrl}/${championshipCode}/result/includeHidden`,
    {
      withCredentials: true,
    },
  );
  if (results.status !== 200)
    throw new Error(`Status ${results.status} ${results.statusText} on results retrieve`);

  return results.data;
};
