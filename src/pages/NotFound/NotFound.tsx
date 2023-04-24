import './NotFound.scss';

import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='not_found__container'>
      <h1>No se encontro la pagina que buscabas</h1>
      <br />
      <br />
      <h2
        onClick={() => {
          navigate('/');
        }}
      >
        Volver al inicio
      </h2>
    </div>
  );
};

export default NotFound;
