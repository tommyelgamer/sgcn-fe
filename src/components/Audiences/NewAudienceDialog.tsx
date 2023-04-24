import {
  Box,
  Button,
  Checkbox,
  Dialog,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FormikHelpers, FormikProps, FormikValues, useFormik } from 'formik';
import * as yup from 'yup';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CompetitorPartial from '../CompetitorPartial/CompetitorPartial';
import { useParams } from 'react-router-dom';
import { useGetChampionshipByCode } from '../../hooks';

interface Props {
  open: boolean;
}

interface Competitor {
  sailingClass: string;
  sailNumber: string;
}

interface IFormValues {
  eventRaceDate: string;
  eventRaceNumber: string;

  audienceType: string;

  requesterBoat: Competitor;
  protestees: Competitor[];

  incidentTime: string;
  incidentRulesInfringed: string;
  incidentWitnesses: Competitor[];

  hailHailedOutloud: boolean;
  hailSituation: string;
  hailWordsUsed: string;
  redFlag: boolean;
  redFlagSituation: string;
  informedOtherWay: boolean;
  informedOtherWayWordsUsed: string;

  incidentDescription: string;
}

const initialFormValues: IFormValues = {
  eventRaceDate: '',
  eventRaceNumber: '',

  audienceType: '',

  requesterBoat: {
    sailingClass: '',
    sailNumber: '',
  },
  protestees: [
    {
      sailingClass: '',
      sailNumber: '',
    },
  ],

  incidentTime: '',
  incidentRulesInfringed: '',
  incidentWitnesses: [
    {
      sailingClass: '',
      sailNumber: '',
    },
  ],

  hailHailedOutloud: false,
  hailSituation: '',
  hailWordsUsed: '',
  redFlag: false,
  redFlagSituation: '',
  informedOtherWay: false,
  informedOtherWayWordsUsed: '',

  incidentDescription: '',
};

const validationSchema = yup.object({
  title: yup.string().required('El titulo es requerido'),
  url: yup.string(),
});

const NewAudienceDialog = ({ open }: Props) => {
  const params = useParams<{
    championshipCode: string;
  }>();
  const championship = useGetChampionshipByCode(params.championshipCode as string);

  if (championship.isError) console.error(championship.error);

  const formik = useFormik<IFormValues>({
    initialValues: initialFormValues,
    validationSchema: validationSchema,
    onSubmit: (values: IFormValues) => {
      console.log(values);
    },
  });

  const handlers = {
    handleAddProtesteeOnClick: () => {
      formik.setValues({
        ...formik.values,
        protestees: [
          ...formik.values.protestees,
          {
            sailingClass: '',
            sailNumber: '',
          },
        ],
      });
    },
  };

  return (
    <Dialog open={open}>
      <Stack spacing={3} sx={{ m: '20px' }}>
        <Box>
          {/* Evento */}
          {/* <br /> */}
          {/* <br /> */}
          <Typography sx={{ fontWeight: 'bold' }}>Evento</Typography>
          <TextField
            sx={{ backgroundColor: 'lightgrey', color: 'black' }}
            disabled
            margin='dense'
            value={championship.data?.longname}
            fullWidth
          />
          {/* <br />
      <br /> */}
          <TextField
            label='Dia y hora de la regata'
            autoFocus
            margin='dense'
            name='eventRaceDate'
            id='eventRaceDate'
            type='text'
            variant='outlined'
            fullWidth
            value={formik.values.eventRaceDate}
            onChange={formik.handleChange}
            error={formik.touched.eventRaceDate && Boolean(formik.errors.eventRaceDate)}
            helperText={formik.touched.eventRaceDate && formik.errors.eventRaceDate}
          />
          {/* <br />
      <br /> */}
          <TextField
            label='Regata N°'
            name='eventRaceNumber'
            id='eventRaceNumber'
            margin='dense'
            fullWidth
            value={formik.values.eventRaceNumber}
            onChange={formik.handleChange}
            error={formik.touched.eventRaceNumber && Boolean(formik.errors.eventRaceNumber)}
            helperText={formik.touched.eventRaceNumber && formik.errors.eventRaceNumber}
          />
        </Box>
        <Box>
          <Stack spacing={1}>
            <Box>
              {/* Tipo de audiencia */}
              {/* <br />
      <br /> */}
              <Typography sx={{ fontWeight: 'bold' }}>Tipo de audiencia</Typography>
              <TextField
                label='Tipo de Audiencia'
                name='audienceType'
                id='audienceType'
                fullWidth
                margin='dense'
                variant='outlined'
                value={formik.values.audienceType}
                onChange={formik.handleChange}
                error={formik.touched.audienceType && Boolean(formik.errors.audienceType)}
                helperText={formik.touched.audienceType && formik.errors.audienceType}
                select
              >
                <MenuItem value={'protest-b2b'}>Protesta de un barco a otro</MenuItem>
                <MenuItem value={'protest-rc2b'}>
                  Protesta de comision de regata a un barco
                </MenuItem>
                <MenuItem value={'protest-pc2b'}>
                  Protesta de comision de protesta a un barco
                </MenuItem>
                <MenuItem value={'redress-by-boat-or-rc'}>
                  Pedido de reparacion por barco o comision de regata
                </MenuItem>
                <MenuItem value={'redress-by-pc'}>
                  Consideracion de reparacion por com. de protesta
                </MenuItem>
                <MenuItem value={'reopen-by-boat'}>
                  Pedido de reapertura por barco o comision de regata
                </MenuItem>
                <MenuItem value={'reopen-by-pc'}>
                  Consideracion de reapertura por com. de protesta
                </MenuItem>
              </TextField>
            </Box>
            <Box>
              {/* Barco que protesta */}
              {/* <br />
      <br /> */}
              <Typography sx={{ fontWeight: 'bold', wordBreak: 'break-word' }}>
                {'Barco que protesta, pide reparacion o reapertura'}
              </Typography>
              <CompetitorPartial
                categoryId='requesterBoat.sailingClass'
                categoryName='requesterBoat.sailingClass'
                categoryValue={formik.values.requesterBoat.sailingClass}
                categoryError={
                  (formik.touched.requesterBoat?.sailingClass as boolean) &&
                  Boolean(formik.errors.requesterBoat?.sailingClass)
                }
                categoryHelperText={
                  formik.touched.requesterBoat?.sailingClass &&
                  formik.errors.requesterBoat?.sailingClass
                }
                sailNumberId='requesterBoat.sailNumber'
                sailNumberName='requesterBoat.sailNumber'
                sailNumberValue={formik.values.requesterBoat.sailNumber}
                sailNumberError={
                  (formik.touched.requesterBoat?.sailNumber as boolean) &&
                  Boolean(formik.errors.requesterBoat?.sailNumber)
                }
                sailNumberHelperText={
                  formik.touched.requesterBoat?.sailNumber &&
                  formik.errors.requesterBoat?.sailNumber
                }
                handleOnChange={formik.handleChange}
                handleDeleteLine={false}
              />
            </Box>
            <Box>
              {/* Barcos protestados */}
              {/* <br />
              <br /> */}
              <Typography sx={{ fontWeight: 'bold', wordBreak: 'break-word' }}>
                {'Barco(s) protestado(s) o considerado(s) para una reparacion'}
              </Typography>
              {formik.values.protestees.map((competitor: Competitor, index: number) => (
                <Box key={index}>
                  <CompetitorPartial
                    categoryId={`protestees[${index}].sailingClass`}
                    categoryName={`protestees[${index}].sailingClass`}
                    categoryValue={formik.values.protestees[index].sailingClass}
                    categoryError={
                      (formik.touched.protestees &&
                        (formik.touched.protestees[index].sailingClass as boolean) &&
                        Boolean(
                          formik.errors.protestees && formik.errors.protestees[index],
                        )) as boolean
                    }
                    categoryHelperText={
                      (formik.touched.protestees &&
                        formik.touched.protestees[index].sailingClass &&
                        formik.errors.protestees &&
                        formik.errors.protestees[index]) as React.ReactNode
                    }
                    sailNumberId={`protestees[${index}].sailNumber`}
                    sailNumberName={`protestees[${index}].sailNumber`}
                    sailNumberValue={formik.values.protestees[index].sailNumber}
                    sailNumberError={
                      (formik.touched.protestees &&
                        (formik.touched.protestees[index].sailNumber as boolean) &&
                        Boolean(
                          formik.errors.protestees && formik.errors.protestees[index],
                        )) as boolean
                    }
                    sailNumberHelperText={
                      (formik.touched.protestees &&
                        formik.touched.protestees[index].sailNumber &&
                        formik.errors.protestees &&
                        formik.errors.protestees[index]) as React.ReactNode
                    }
                    handleOnChange={formik.handleChange}
                    handleDeleteLine={false}
                  />
                </Box>
              ))}
              <Button
                variant='outlined'
                startIcon={<AddCircleOutlineIcon />}
                fullWidth
                onClick={() => {
                  handlers.handleAddProtesteeOnClick();
                }}
              >
                Añadir otro barco
              </Button>
            </Box>
          </Stack>
        </Box>
        {/* Incidente */}
        {/* <br />
      <br />
      <Typography sx={{ fontWeight: 'bold', wordBreak: 'break-word' }}>{'Incidente'}</Typography>
      <TextField
        label='Hora y lugar del incidente'
        value={newAudienceFormValues.incidentTime}
        onChange={(e) => {
          dispatch(
            changeNewRequestFormValues({
              key: 'incidentTime',
              value: e.target.value as string,
            }),
          );
        }}
        fullWidth
      />
      <br />
      <br />
      <TextField
        label='Reglas que se habrian infringido'
        value={newAudienceFormValues.incidentRulesInringed}
        onChange={(e) => {
          dispatch(
            changeNewRequestFormValues({
              key: 'incidentRulesInringed',
              value: e.target.value as string,
            }),
          );
        }}
        fullWidth
      />
      <br />
      <br />
      <Typography sx={{ fontWeight: 'normal', wordBreak: 'break-word' }}>{'Testigos'}</Typography>
      {newAudienceFormValues.incidentWitnesses.map((competitor: Competitor, index: number) => (
        <div key={index}>
          <CompetitorPartial
            categoryValue={newAudienceFormValues.incidentWitnesses[index].category}
            handleCategoryChange={handlers.handleIncidentWitnessesListCategoryChange}
            sailNumberValue={newAudienceFormValues.incidentWitnesses[index].sailNumber}
            handleSailNumberChange={handlers.handleIncidentWitnessesListSailNumberChange}
            enableDeleteLine={true}
            handleDeleteLine={handlers.handleIncidentWitnessesListDeleteItem}
            index={index}
            isAudience={true}
          />
          <br />
        </div>
      ))}
      <Button
        variant='outlined'
        startIcon={<AddCircleOutlineIcon />}
        fullWidth
        onClick={() => {
          handlers.handleAddIncidentWitnessesOnClick();
        }}
      >
        Añadir testigo
      </Button> */}

        {/* Aviso al protestado */}
        {/* <br />
      <br />
      <Typography sx={{ fontWeight: 'bold', wordBreak: 'break-word' }}>
        {'Aviso al protestado'}
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) => {
              dispatch(
                changeNewRequestFormValues({
                  key: 'hailHailedOutloud',
                  value: e.target.checked || false,
                }),
              );
            }}
            checked={newAudienceFormValues.hailHailedOutloud}
          />
        }
        label='Se aviso a viva voz'
      />
      <TextField
        label='Cuando?'
        value={newAudienceFormValues.hailSituation}
        onChange={(e) => {
          dispatch(
            changeNewRequestFormValues({
              key: 'hailSituation',
              value: e.target.value as string,
            }),
          );
        }}
        fullWidth
      />
      <TextField
        label='Palabra(s) usada(s)'
        value={newAudienceFormValues.hailWordsUsed}
        onChange={(e) => {
          dispatch(
            changeNewRequestFormValues({
              key: 'hailWordsUsed',
              value: e.target.value as string,
            }),
          );
        }}
        fullWidth
      />
      <br />
      <br />
      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) => {
              dispatch(
                changeNewRequestFormValues({
                  key: 'redFlag',
                  value: e.target.checked || false,
                }),
              );
            }}
            checked={newAudienceFormValues.redFlag}
          />
        }
        label='Se desplego una bandera roja'
      />
      <TextField
        label='Cuando?'
        value={newAudienceFormValues.redFlagSituation}
        onChange={(e) => {
          dispatch(
            changeNewRequestFormValues({
              key: 'redFlagSituation',
              value: e.target.value as string,
            }),
          );
        }}
        fullWidth
      />
      <br />
      <br />
      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) => {
              dispatch(
                changeNewRequestFormValues({
                  key: 'informedOtherWay',
                  value: e.target.checked || false,
                }),
              );
            }}
            checked={newAudienceFormValues.informedOtherWay}
          />
        }
        label='Se informo de otro modo'
      />
      <TextField
        label='Aclare como'
        value={newAudienceFormValues.informedOtherWayWordsUsed}
        onChange={(e) => {
          dispatch(
            changeNewRequestFormValues({
              key: 'informedOtherWayWordsUsed',
              value: e.target.value as string,
            }),
          );
        }}
        fullWidth
      /> */}

        {/* Descripcion del incidente */}
        {/* <br />
      <br />
      <Typography sx={{ fontWeight: 'bold', wordBreak: 'break-word' }}>
        {'Descripcion del incidente'}
      </Typography>
      <TextField
        label='Descripcion del incidente'
        value={newAudienceFormValues.incidentDescription}
        onChange={(e) => {
          dispatch(
            changeNewRequestFormValues({
              key: 'incidentDescription',
              value: e.target.value as string,
            }),
          );
        }}
        fullWidth
        multiline
        rows={4}
      /> */}
      </Stack>
    </Dialog>
  );
};

export default NewAudienceDialog;
