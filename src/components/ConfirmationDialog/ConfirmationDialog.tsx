import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

export const ConfirmationDialog = ({
  open,
  title,
  text,
  acceptCallback,
  cancelCallback,
  acceptButtonText,
  cancelButtonText,
}: {
  open: boolean;
  title: string;
  text: string;
  acceptCallback: () => void;
  cancelCallback: () => void;
  acceptButtonText?: string;
  cancelButtonText?: string;
}) => {
  return (
    <Dialog open={open} onClose={cancelCallback} aria-labelledby={title} aria-describedby={text}>
      <DialogTitle sx={{ fontWeight: '700' }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'black' }}>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelCallback}>{cancelButtonText || 'Cancelar'}</Button>
        <Button onClick={acceptCallback} autoFocus>
          {acceptButtonText || 'Aceptar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
