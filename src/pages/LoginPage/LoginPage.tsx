import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { muiTheme } from '../../theme/customTheme';
import { Helmet } from 'react-helmet';
import { useGetAllChampionships } from '../../hooks/championships/useGetAllChampionships';
import { Championship } from '../../api/entities';
import { MenuItem } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useSearchParams } from 'react-router-dom';
import { useLoginUser } from '../../hooks/auth/login.hook';

const validationSchema = yup.object({
  championshipCode: yup.string().required('Seleccione un campeonato'),
  username: yup.string().required('El usuario es requerido'),
  password: yup.string().required('La contraseña es requerida'),
});

export default function SignIn() {
  const [queryParams] = useSearchParams();
  const championshipsData = useGetAllChampionships();
  const loginMutation = useLoginUser();

  if (championshipsData.isError) console.error(championshipsData.error);

  const formik = useFormik({
    initialValues: {
      championshipCode: queryParams.get('championshipCode') || '',
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: { championshipCode: string; username: string; password: string }) => {
      loginMutation.mutate({
        championshipId:
          championshipsData.data?.find(
            (championship) => championship.code === values.championshipCode,
          )?.id || 0,
        username: values.username,
        password: values.password,
      });
    },
  });

  return (
    <>
      <Helmet>
        <title>Login Autoridades | SGCN</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Helmet>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Login Autoridades
          </Typography>
          <Box component='form' onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='championshipCode'
              label='Campeonato'
              name='championshipCode'
              autoComplete='championshipCode'
              autoFocus
              sx={{ backgroundColor: muiTheme.palette.background.paper }}
              value={formik.values.championshipCode}
              onChange={formik.handleChange}
              error={formik.touched.championshipCode && Boolean(formik.errors.championshipCode)}
              helperText={formik.touched.championshipCode && formik.errors.championshipCode}
              select
            >
              {championshipsData.data?.map((championship: Championship) => (
                <MenuItem key={championship.id} value={championship.code}>
                  {championship.longname}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin='normal'
              required
              fullWidth
              id='username'
              label='Usuario'
              name='username'
              autoComplete='username'
              autoFocus
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              sx={{ backgroundColor: muiTheme.palette.background.paper }}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{ backgroundColor: muiTheme.palette.background.paper }}
            />

            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Iniciar Sesion
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
