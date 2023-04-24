import { useEffect } from 'react';
import { useLogoutUser } from '../../hooks/auth/logout.hook';
import './LogoutPage.scss';

const LogoutPage = () => {
  const logoutMutation = useLogoutUser();
  useEffect(() => logoutMutation.mutate(), []);
  return <></>;
};

export default LogoutPage;
