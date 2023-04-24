import './SystemHome.scss';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { FormControl, InputLabel, Skeleton, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import getAllChampionships from '../../api/championship/getAllChampionship';

const SystemHome = () => {
  const [selectedChampionship, setSelectedChampionship] = useState<string>('');
  const navigate = useNavigate();

  const championships = useQuery({
    queryKey: ['championships'],
    queryFn: getAllChampionships,
  });

  return (
    <div className='system_home__container'>
      <div className='system_home__container__header'>
        <div className='system_home__container__header__title'>
          <h1>
            <b>S</b>istema de <b>G</b>estion de <b>C</b>ampeonatos <b>N</b>auticos
          </h1>
        </div>
        <br />
        <p>Seleccione un campeonato para comenzar</p>
      </div>
      <div className='system_home__container__selector_box'>
        {championships.isLoading && <Skeleton variant='rectangular' height={56} />}
        {!championships.isLoading && (
          <FormControl fullWidth sx={{ backgroundColor: '#ffffff' }}>
            <InputLabel id='championship-simple-select-label'>Campeonato</InputLabel>
            <Select
              labelId='championship-simple-select-label'
              id='championship-simple-select'
              value={selectedChampionship}
              label={'Campeonato'}
              onChange={async (e: SelectChangeEvent) => {
                setSelectedChampionship(e.target.value as string);

                navigate(`/${e.target.value}/`);
              }}
            >
              {championships.data
                ? championships.data.map((championship, i1) => {
                    return (
                      <MenuItem key={i1} value={championship.code}>
                        {championship.longname}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
        )}
      </div>
    </div>
  );
};

export default SystemHome;
