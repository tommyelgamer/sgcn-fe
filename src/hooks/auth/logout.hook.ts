import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { logoutUser } from '../../api/auth/logoutUser';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const useLogoutUser = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const logoutUserMutation = useMutation({
    mutationFn: () => logoutUser(),
    onError: (error: unknown) => {
      console.error(error);
      toast.error('Error al iniciar sesion');
    },
    onSuccess: () => {
      let redirectURI: string;

      if (searchParams.get('championshipCode') != null) {
        redirectURI = `/${searchParams.get('championshipCode') || ''}`;
      } else {
        redirectURI = '/';
      }
      navigate(redirectURI);
    },
  });

  return logoutUserMutation;
};
