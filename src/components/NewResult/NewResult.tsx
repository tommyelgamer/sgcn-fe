import {
  Dialog,
  Box,
  TextField,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  Divider,
  IconButton,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useCreateNewResult } from '../../hooks';
import { useParams } from 'react-router-dom';

const validationSchema = yup.object({
  sailingClass: yup.string().required('El titulo es requerido'),
  url: yup.string(),
  hideLastResult: yup.boolean().default(true),
});

const NewResult = ({
  dialogIsOpen,
  dialogOnClose,
}: {
  dialogIsOpen: boolean;
  dialogOnClose: () => void;
}) => {
  const params = useParams<{
    championshipCode: string;
  }>();
  const createNewResultMutation = useCreateNewResult(params.championshipCode as string);

  const formik = useFormik<{
    sailingClass: string;
    url: string;
    file: any;
    hideLastResult: boolean;
  }>({
    initialValues: {
      sailingClass: '',
      url: '',
      file: undefined,
      hideLastResult: true,
    },
    validationSchema: validationSchema,
    validate: (values: any) => {
      const errors: any = {};

      if (values.url === '' && values.file === undefined) {
        errors.url = 'Debe ingresar una URL o subir un archivo';
        errors.file = 'Debe subir un archivo o ingresar una URL';
      }

      return errors;
    },
    onSubmit: (values: any) => {
      createNewResultMutation.mutate(
        {
          sailingClass: values.sailingClass,
          url: values.url,
          resultFile: values.file,
          hideLastResult: values.hideLastResult,
        },
        {
          onSuccess: () => {
            formik.resetForm();
            dialogOnClose();
          },
        },
      );
    },
  });

  return (
    <Dialog open={dialogIsOpen} onClose={dialogOnClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Nuevo Resultado</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='normal'
            name='sailingClass'
            id='sailingClass'
            label='Clase'
            type='text'
            variant='outlined'
            fullWidth
            value={formik.values.sailingClass}
            onChange={formik.handleChange}
            error={formik.touched.sailingClass && Boolean(formik.errors.sailingClass)}
            helperText={formik.touched.sailingClass && formik.errors.sailingClass}
          />
          <br />
          <TextField
            margin='normal'
            name='url'
            id='resultURL'
            label='URL al Resultado'
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
              id='resultFile'
              hidden
              onChange={(e: any) => {
                formik.setFieldValue('file', e.currentTarget.files[0]);
              }}
            />
          </Button>
          {formik.values.file && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'start',
                alignItems: 'center',
                pt: '3%',
                maxWidth: '231.64px',
              }}
            >
              <IconButton
                onClick={() => {
                  formik.setFieldValue('file', undefined);
                }}
              >
                <CancelIcon />
              </IconButton>
              <p
                style={{
                  marginLeft: '2%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {formik.values.file.name}
              </p>
            </Box>
          )}
          <FormControlLabel
            control={
              <Checkbox
                name='hideLastResult'
                id='hideLastResult'
                checked={formik.values.hideLastResult}
                onChange={formik.handleChange}
              />
            }
            label='Esconder el ultimo resultado de la clase'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogOnClose}>Cancelar</Button>
          <Button type='submit'>Guardar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewResult;
