import { useQuery } from '@tanstack/react-query';
import getAllChampionships from '../../api/championship/getAllChampionship';

export const useGetAllChampionships = () => {
  const championshipRequest = useQuery({
    queryKey: ['championships'],
    queryFn: () => getAllChampionships(),
  });

  return championshipRequest;
};
