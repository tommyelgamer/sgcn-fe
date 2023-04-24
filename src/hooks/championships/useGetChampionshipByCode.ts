import { useQuery } from '@tanstack/react-query';
import getChampionshipByCode from '../../api/championship/getChampionshipByCode';

export const useGetChampionshipByCode = (championshipCode: string) => {
  const championshipRequest = useQuery({
    queryKey: ['championship', championshipCode],
    queryFn: () => getChampionshipByCode(championshipCode),
  });

  return championshipRequest;
};
