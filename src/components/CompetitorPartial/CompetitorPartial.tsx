import { Grid, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function CompetitorPartial({
  categoryValue,
  categoryId,
  categoryName,
  categoryError,
  categoryHelperText,
  sailNumberValue,
  sailNumberId,
  sailNumberName,
  sailNumberError,
  sailNumberHelperText,
  handleOnChange,
  enableDeleteLine = false,
  handleDeleteLine,
}: {
  categoryValue: string;
  categoryId: string;
  categoryName: string;
  categoryError: boolean;
  categoryHelperText: React.ReactNode;
  sailNumberValue: string;
  sailNumberId: string;
  sailNumberName: string;
  sailNumberError: boolean;
  sailNumberHelperText: React.ReactNode;
  handleOnChange: any;
  enableDeleteLine?: boolean;
  handleDeleteLine: any;
}) {
  return (
    <Grid container spacing={2} columns={14}>
      <Grid item xs={enableDeleteLine ? 6 : 7}>
        <TextField
          label='Categoria'
          margin='dense'
          placeholder='Optimist Timoneles'
          name={categoryName}
          id={categoryId}
          type='text'
          variant='outlined'
          fullWidth
          value={categoryValue}
          onChange={handleOnChange}
          error={categoryError}
          helperText={categoryHelperText}
        />
      </Grid>
      <Grid item xs={enableDeleteLine ? 6 : 7}>
        <TextField
          label='Numero de Vela'
          placeholder='ARG2587'
          margin='dense'
          name={sailNumberName}
          id={sailNumberId}
          value={sailNumberValue}
          onChange={handleOnChange}
          fullWidth
          error={sailNumberError}
          helperText={sailNumberHelperText}
        />
      </Grid>
      {enableDeleteLine && (
        <Grid item xs={2}>
          <IconButton aria-label='delete' onClick={handleDeleteLine}>
            <CloseIcon />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
}
