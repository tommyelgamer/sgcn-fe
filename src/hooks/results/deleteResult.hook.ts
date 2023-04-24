import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { deleteResult } from '../../api/results';

export const useDeleteResult = (championshipCode: string) => {
  const queryClient = useQueryClient();

  const deleteResultMutation = useMutation({
    mutationFn: (resultId: number) => deleteResult(championshipCode, resultId),
    onError: (error) => {
      console.error(error);
      toast.error('Error al eliminar el resultado');
    },
    onSuccess: () => {
      toast.success('Resultado eliminado');
      queryClient.invalidateQueries({ queryKey: [championshipCode, 'results'] });
    },
  });

  return deleteResultMutation;
};
