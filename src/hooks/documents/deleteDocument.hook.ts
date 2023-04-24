import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteDocument } from '../../api/documents';

export const useDeleteDocument = (championshipCode: string) => {
  const queryClient = useQueryClient();

  const deleteDocumentMutation = useMutation({
    mutationFn: (docId: number) => deleteDocument(championshipCode, docId),
    onError: (error) => {
      console.error(error);
      toast.error('Error al eliminar el documento');
    },
    onSuccess: () => {
      toast.success('Documento eliminado');
      queryClient.invalidateQueries({ queryKey: [championshipCode, 'documents'] });
    },
  });

  return deleteDocumentMutation;
};
