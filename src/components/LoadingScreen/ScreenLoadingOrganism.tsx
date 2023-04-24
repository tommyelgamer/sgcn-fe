import { Backdrop, CircularProgress } from '@mui/material';

export function ScreenLoadingOrganism({ isOpen }: { isOpen: any }) {
  return (
    <Backdrop open={isOpen}>
      <CircularProgress color='inherit' />
    </Backdrop>
  );
}

export default ScreenLoadingOrganism;
