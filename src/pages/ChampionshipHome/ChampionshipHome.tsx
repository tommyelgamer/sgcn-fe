import './ChampionshipHome.scss';

import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import getChampionshipByCode from '../../api/championship/getChampionshipByCode';
import { ScreenLoadingOrganism, MemoizedClickableCard } from '../../components';
import { useGetChampionshipByCode } from '../../hooks';
import { Box, Typography } from '@mui/material';
import muiTheme from '../../theme/customTheme';

const ChampionshipHome = () => {
  const navigate = useNavigate();
  const params = useParams();

  if (!params.championshipCode) {
    navigate('/');
  }

  const championshipData = useGetChampionshipByCode(params.championshipCode || '');

  if (championshipData.isLoading)
    return <ScreenLoadingOrganism isOpen={championshipData.isLoading} />;

  if (championshipData.isError) {
    console.error(championshipData.error);
    toast.error('Error getting championship data');
  }

  return (
    <div className='championship_home__container'>
      <div className='championship_home__header'>
        <div className='championship_home__header__title'>
          <Typography
            sx={{
              typography: { xs: 'h2', md: 'h1' },
              ml: { xs: 2, md: 8 },
              mr: { xs: 2, md: 8 },
              color: muiTheme.palette.primary.main,
            }}
            textAlign='center'
          >
            {championshipData.data?.longname}
          </Typography>
        </div>
        <br />
        <Typography sx={{ typography: { xs: 'h5', md: 'h4' } }} textAlign='center'>
          Utilize el menu lateral, o las tarjetas de debajo, para acceder a las diversas
          funcionalidades
        </Typography>
      </div>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexBasis='50%'
        flexDirection='row'
        flexWrap='wrap'
      >
        {championshipData.data?.championshipFeatures.audienceIsEnabled && (
          <MemoizedClickableCard
            route={`/${params.championshipCode}/requests/audience`}
            title='Solicitar Audiencia'
            description='Haz click para solicitar una audiencia ante el jurado (Protesta, Reparacion o Reapertura)'
          />
        )}
        {championshipData.data?.championshipFeatures.resultreviewIsEnabled && (
          <MemoizedClickableCard
            route={`/${params.championshipCode}/requests/resultreview`}
            title='Solicitar Revision de Resultados'
            description='Haz click para solicitar a la CR que revise un resultado que crees que es erroneo'
          />
        )}
        {championshipData.data?.championshipFeatures.equipmentchangeIsEnabled && (
          <MemoizedClickableCard
            route={`/${params.championshipCode}/requests/equipmentchange`}
            title='Solicitar Cambio de Equipo'
            description='Haz click para solicitar a la Autoridad Organizadora autorizacion para cambiar equipo en tu barco o un tripulante'
          />
        )}
        {championshipData.data?.championshipFeatures.declarationsIsEnabled && (
          <MemoizedClickableCard
            route={`/${params.championshipCode}/declarations`}
            title='Nueva Declaracion de Competidor'
            description='Haz click para enviar una declaracion de competidor (EJ: Retirarse de una regata)'
          />
        )}
      </Box>
    </div>
  );
};

export default ChampionshipHome;
