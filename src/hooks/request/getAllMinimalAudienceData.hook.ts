import { useQuery } from '@tanstack/react-query';
import { getAllMinimalAudienceData } from '../../api/requests';

export const useGetAllMinimalAudienceData = (championshipCode: string) => {
  const audienceDataRequest = useQuery({
    queryKey: [championshipCode, 'audience-minimal'],
    queryFn: () => getAllMinimalAudienceData(championshipCode),
  });

  return audienceDataRequest;
};
