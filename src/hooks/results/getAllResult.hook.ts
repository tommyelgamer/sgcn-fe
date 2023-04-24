import { useQuery } from '@tanstack/react-query';

import { getAllResults } from '../../api/results';

export const useGetAllResults = (championshipCode: string) => {
  const resultsTableDataRequest = useQuery({
    queryKey: [championshipCode, 'results'],
    queryFn: () => getAllResults(championshipCode),
  });

  return resultsTableDataRequest;
};
