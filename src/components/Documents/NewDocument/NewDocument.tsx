import './NewDocument.scss';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Divider,
  IconButton,
} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useCreateNewDocument } from '../../../hooks';
import { useParams } from 'react-router-dom';

const validationSchema = yup.object({
  title: yup.string().required('El titulo es requerido'),
  url: yup.string(),
});

export function NewDocument({
  dialogIsOpen,
  dialogOnClose,
}: {
  dialogIsOpen: boolean;
  dialogOnClose: () => void;
}) {
  const params = useParams<{
    championshipCode: string;
  }>();
  const createDocumentMutation = useCreateNewDocument(params.championshipCode as string);

  const formik = useFormik<{
    title: string;
    url: string;
    file: any;
  }>({
    initialValues: {
      title: '',
      url: '',
      file: undefined,
    },
    validationSchema: validationSchema,
    validate: (values) => {
      const errors: any = {};

      if (values.url === '' && values.file === undefined) {
        errors.url = 'Debe ingresar una URL o subir un archivo';
        errors.file = 'Debe subir un archivo o ingresar una URL';
      }

      return errors;
    },
    onSubmit: (values: any) => {
      createDocumentMutation.mutate({
        title: values.title,
        url: values.url ? values.url : undefined,
        documentFile: values.file ? values.file : undefined,
      });
    },
  });

  return (
    <Dialog open={dialogIsOpen} onClose={dialogOnClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Nuevo Documento</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='normal'
            name='title'
            id='documentTitle'
            label='Titulo del Documento'
            type='text'
            variant='outlined'
            fullWidth
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <br />
          <TextField
            margin='normal'
            name='url'
            id='documentUrl'
            label='URL al Documento'
            type='url'
            variant='outlined'
            value={formik.values.url}
            onChange={formik.handleChange}
            error={formik.touched.url && Boolean(formik.errors.url)}
            helperText={formik.touched.url && formik.errors.url}
            disabled={formik.values.file && formik.values.file !== null}
            fullWidth
          />
          <Divider textAlign='center'>o</Divider>
          <Button
            variant='outlined'
            component='label'
            sx={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '5%' }}
            fullWidth
            disabled={formik.values.url !== ''}
          >
            <FileUploadIcon />
            Subir Archivo
            <input
              type='file'
              name='file'
              id='documentFile'
              hidden
              onChange={(e: any) => {
                formik.setFieldValue('file', e.currentTarget.files[0]);
              }}
            />
          </Button>
          {formik.values.file && (
            <div className='new_document_dialog__file__cancel__container'>
              <IconButton
                onClick={() => {
                  formik.setFieldValue('file', undefined);
                }}
              >
                <CancelIcon />
              </IconButton>
              <p className='new_document_dialog__file__cancel__container__text'>
                {formik.values.file.name}
              </p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogOnClose}>Cancelar</Button>
          <Button type='submit'>Guardar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default NewDocument;
