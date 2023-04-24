import { useQuery } from '@tanstack/react-query';

import { getAllDocuments } from '../../api/documents';

export const useGetAllDocuments = (championshipCode: string) => {
  const documentsTableDataRequest = useQuery({
    queryKey: [championshipCode, 'documents'],
    queryFn: () => getAllDocuments(championshipCode),
    refetchInterval: 10 * 1000,
  });

  return documentsTableDataRequest;
};
