import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import muiTheme from '../../theme/customTheme';
import { useCookies } from 'react-cookie';
import { useDeleteResult, useGetAllResults, useUpdateResultHiddenStatus } from '../../hooks';
import { useParams } from 'react-router-dom';
import APIConfig from '../../api/config/config';
import MoreActionsMenu from '../../components/MoreActionsMenu/MoreActionsMenu';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { roleHasPermission } from '../../utils/role/roleHasPermission';
import EPermission from '../../utils/role/permission/permission.type';
// import { NewResult } from '../../components';
import { useState } from 'react';
import NewResult from '../../components/NewResult/NewResult';
import { useGetAllResultsWithHidden } from '../../hooks/results/getAllResultsWithHidden.hook';
import { UseQueryResult } from '@tanstack/react-query';
import { Result } from '../../api/entities';
import { userInfo } from 'os';

const ResultsPage = () => {
  const [cookies] = useCookies(['UserData']);
  const params = useParams<{
    championshipCode: string;
  }>();

  const [newResultDialogIsOpen, setNewResultDialogIsOpen] = useState<boolean>(false);

  let results: UseQueryResult<Result[], unknown>;

  if (
    cookies.UserData &&
    roleHasPermission(cookies.UserData.role, EPermission.UpdateResultHiddenStatus)
  ) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    results = useGetAllResultsWithHidden(params.championshipCode as string);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    results = useGetAllResults(params.championshipCode as string);
  }

  const deleteResultMutation = useDeleteResult(params.championshipCode as string);
  const updateResultHiddenStatusMutation = useUpdateResultHiddenStatus(
    params.championshipCode as string,
  );

  if (results.isError) console.error(results.error);

  if (results.data) {
    results.data.sort((a, b) => Number(new Date(b.publishdate)) - Number(new Date(a.publishdate)));
  }

  const getMoreActionOptions = (
    result: Result,
  ): {
    text: string;
    onClick: (...params: any[]) => void;
    danger?: boolean;
    icon?: React.ReactElement;
  }[] => {
    const actionsMenu: {
      text: string;
      onClick: (...params: any[]) => void;
      danger?: boolean;
      icon?: React.ReactElement;
    }[] = [];

    if (
      cookies.UserData &&
      roleHasPermission(cookies.UserData.role, EPermission.UpdateResultHiddenStatus)
    ) {
      actionsMenu.push({
        text: result.isHidden ? 'Desocultar' : 'Ocultar',
        icon: result.isHidden ? <VisibilityIcon /> : <VisibilityOffIcon />,
        danger: false,
        onClick: () => {
          updateResultHiddenStatusMutation.mutate({
            id: result.id,
            isHiddenValue: !result.isHidden,
          });
        },
      });
    }

    actionsMenu.push({
      text: 'Eliminar',
      icon: <DeleteIcon />,
      danger: true,
      onClick: () => {
        deleteResultMutation.mutate(result.id);
      },
    });

    return actionsMenu;
  };

  return (
    <div>
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ typography: 'h2' }}>Resultados</Typography>
        </Box>
        <Box sx={{ pt: { md: 6 }, pl: { xs: 0, md: 8 }, pr: { xs: 0, md: 8 } }}>
          {cookies.UserData &&
            roleHasPermission(cookies.UserData.role, EPermission.CreateResult) && (
              <Button
                variant='contained'
                startIcon={<AddCircleIcon />}
                sx={{ mb: 2 }}
                onClick={() => setNewResultDialogIsOpen(true)}
              >
                Nuevo Resultado
              </Button>
            )}
          <TableContainer component={Paper}>
            <Table aria-label='Tabla de resultados'>
              <TableHead
                sx={{
                  backgroundColor: muiTheme.palette.primary.dark,
                }}
              >
                <TableRow>
                  <TableCell sx={{ color: muiTheme.palette.primary.contrastText }}>
                    Fecha de publicación
                  </TableCell>
                  <TableCell sx={{ color: muiTheme.palette.primary.contrastText }}>
                    Resultado
                  </TableCell>
                  {cookies.UserData &&
                    roleHasPermission(cookies.UserData.role, EPermission.DeleteResult) && (
                      <TableCell
                        sx={{ maxWidth: '15px', color: muiTheme.palette.primary.contrastText }}
                      >
                        Más
                      </TableCell>
                    )}
                </TableRow>
              </TableHead>
              <TableBody>
                {results.data && results.data.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={cookies.UserData ? 3 : 2}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '100%',
                          height: '150px',
                        }}
                      >
                        <Typography variant='body1' sx={{ textAlign: 'center' }}>
                          No se encontraron resultados cargados
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
                {results.data && results.data.length > 0 && (
                  <>
                    {results.data.map((result) => {
                      return (
                        <TableRow
                          key={result.id}
                          sx={{
                            backgroundColor:
                              result.isHidden === true
                                ? '#9a9a9a'
                                : muiTheme.palette.background.paper,
                          }}
                        >
                          <TableCell>{new Date(result.publishdate).toLocaleString()}</TableCell>
                          <TableCell>
                            <a
                              href={
                                result.attachment.url
                                  ? result.attachment.url
                                  : `${APIConfig.baseUrl}/${params.championshipCode}/result/download/${result.id}`
                              }
                              target='_blank'
                              rel='noreferrer'
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                color: 'blue',
                              }}
                            >
                              <LinkIcon sx={{ mr: 1 }} />
                              {`Resultados ${result.sailingClass}`}
                            </a>
                          </TableCell>
                          {cookies.UserData &&
                            roleHasPermission(cookies.UserData.role, EPermission.DeleteResult) && (
                              <TableCell>
                                <MoreActionsMenu menuItems={getMoreActionOptions(result)} />
                              </TableCell>
                            )}
                        </TableRow>
                      );
                    })}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Stack>
      <NewResult
        dialogIsOpen={newResultDialogIsOpen}
        dialogOnClose={() => {
          setNewResultDialogIsOpen(false);
        }}
      />
    </div>
  );
};

export default ResultsPage;
