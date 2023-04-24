import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CssBaseline from '@mui/material/CssBaseline';

import { toast } from 'react-toastify';

import SideBar from 'src/components/SideBar/SideBar';
import getAllChampionships from './api/championship/getAllChampionship';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useGetChampionshipByCode } from './hooks';

const Layout = () => {
  const [cookies] = useCookies(['UserData']);
  const params = useParams<{
    championshipCode: string;
  }>();
  const navigate = useNavigate();

  const championshipData = useGetChampionshipByCode(params.championshipCode || '');

  useEffect(() => {
    if (
      championshipData.data &&
      params.championshipCode &&
      championshipData.data.code !== params.championshipCode
    ) {
      toast.error(`No se encontro el campeonato con codigo ${params.championshipCode}`, {
        theme: 'colored',
      });
      navigate('/');
    }
  }, [championshipData.data, params.championshipCode, navigate]);

  return (
    <>
      <CssBaseline />
      <SideBar isAuthority={cookies.UserData ? true : false}>
        <div className='app__container'>
          <Outlet />
        </div>
      </SideBar>
    </>
  );
};

export default Layout;
