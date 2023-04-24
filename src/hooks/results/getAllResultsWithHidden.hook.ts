import { useQuery } from '@tanstack/react-query';
import { getAllResultsWithHidden } from '../../api/results';

export const useGetAllResultsWithHidden = (championshipCode: string) => {
  const resultsTableDataRequest = useQuery({
    queryKey: [championshipCode, 'results', 'include-hidden'],
    queryFn: () => getAllResultsWithHidden(championshipCode),
  });

  return resultsTableDataRequest;
};
