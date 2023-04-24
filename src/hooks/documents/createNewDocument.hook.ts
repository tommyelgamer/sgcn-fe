import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { createNewDocument, createNewDocumentData } from '../../api/documents';

export const useCreateNewDocument = (championshipCode: string) => {
  const queryClient = useQueryClient();

  const createNewDocumentMutation = useMutation({
    mutationFn: (docsData: createNewDocumentData) => createNewDocument(championshipCode, docsData),
    onError: (error: unknown) => {
      console.error(error);
      toast.error('Error al crear nuevo documento');
    },
    onSuccess: () => {
      toast.success('Nuevo documento creado');
      queryClient.invalidateQueries({ queryKey: [championshipCode, 'documents'] });
    },
  });

  return createNewDocumentMutation;
};
