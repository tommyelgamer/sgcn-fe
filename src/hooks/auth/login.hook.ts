import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { loginUser, loginUserData } from '../../api/auth/loginUser';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const useLoginUser = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const loginUserMutation = useMutation({
    mutationFn: (loginData: loginUserData) => loginUser(loginData),
    onError: (error: unknown) => {
      console.error(error);
      toast.error('Error al iniciar sesion');
    },
    onSuccess: (data) => {
      let redirectURI: string;

      if (searchParams.get('redirectUri') != null) {
        redirectURI = searchParams.get('redirectUri') || '';
      } else if (searchParams.get('championshipCode') != null) {
        redirectURI = '/' + searchParams.get('championshipCode') || '';
      } else {
        redirectURI = '/';
      }
      navigate(redirectURI);
    },
  });

  return loginUserMutation;
};
