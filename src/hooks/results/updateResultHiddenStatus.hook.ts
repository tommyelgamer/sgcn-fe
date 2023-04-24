import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateResultHiddenStatus } from '../../api/results';

export const useUpdateResultHiddenStatus = (championshipCode: string) => {
  const queryClient = useQueryClient();

  const updateResultHiddenStatusMutation = useMutation({
    mutationFn: ({ id, isHiddenValue }: { id: number; isHiddenValue: boolean }) =>
      updateResultHiddenStatus(championshipCode, id, isHiddenValue),
    onError: (error: unknown) => {
      console.error(error);
      toast.error('Error al actualizar el resultados');
    },
    onSuccess: () => {
      // toast.success('Nuevo resultado creado');
      queryClient.invalidateQueries({ queryKey: [championshipCode, 'results', 'include-hidden'] });
    },
  });

  return updateResultHiddenStatusMutation;
};
