import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { createNewResult, createNewResultData } from '../../api/results';

export const useCreateNewResult = (championshipCode: string) => {
  const queryClient = useQueryClient();

  const createNewResultMutation = useMutation({
    mutationFn: (resultData: createNewResultData) => createNewResult(championshipCode, resultData),
    onError: (error: unknown) => {
      console.error(error);
      toast.error('Error al crear nuevo resultados');
    },
    onSuccess: () => {
      toast.success('Nuevo resultado creado');
      queryClient.invalidateQueries({ queryKey: [championshipCode, 'results'] });
    },
  });

  return createNewResultMutation;
};
