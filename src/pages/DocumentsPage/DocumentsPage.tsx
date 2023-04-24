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
import { useDeleteDocument, useGetAllDocuments } from '../../hooks';
import { useParams } from 'react-router-dom';
import APIConfig from '../../api/config/config';
import MoreActionsMenu from '../../components/MoreActionsMenu/MoreActionsMenu';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { roleHasPermission } from '../../utils/role/roleHasPermission';
import EPermission from '../../utils/role/permission/permission.type';
import { NewDocument } from '../../components';
import { useState } from 'react';

const DocumentsPage = () => {
  const [cookies] = useCookies(['UserData']);
  const params = useParams<{
    championshipCode: string;
  }>();

  const [newDocumentDialogIsOpen, setNewDocumentDialogIsOpen] = useState<boolean>(false);

  const documents = useGetAllDocuments(params.championshipCode as string);
  const deleteDocumentMutation = useDeleteDocument(params.championshipCode as string);

  if (documents.isError) console.error(documents.error);

  if (documents.data) {
    documents.data.sort(
      (a, b) => Number(new Date(b.publishdate)) - Number(new Date(a.publishdate)),
    );
  }

  const getMoreActionOptions = (
    docId: number,
  ): {
    text: string;
    onClick: (...params: any[]) => void;
    danger?: boolean;
    icon?: React.ReactElement;
  }[] => {
    return [
      {
        text: 'Eliminar',
        icon: <DeleteIcon />,
        danger: true,
        onClick: () => {
          // console.debug(docId);
          deleteDocumentMutation.mutate(docId);
        },
      },
    ];
  };

  return (
    <div>
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ typography: 'h2' }}>Documentos</Typography>
        </Box>
        <Box sx={{ pt: { md: 6 }, pl: { xs: 0, md: 8 }, pr: { xs: 0, md: 8 } }}>
          {cookies.UserData &&
            roleHasPermission(cookies.UserData.role, EPermission.CreateDocument) && (
              <Button
                variant='contained'
                startIcon={<AddCircleIcon />}
                sx={{ mb: 2 }}
                onClick={() => setNewDocumentDialogIsOpen(true)}
              >
                Nuevo Documento
              </Button>
            )}
          <TableContainer component={Paper}>
            <Table aria-label='Tabla de documentos'>
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
                    Documento
                  </TableCell>
                  {cookies.UserData &&
                    roleHasPermission(cookies.UserData.role, EPermission.DeleteDocument) && (
                      <TableCell
                        sx={{ maxWidth: '15px', color: muiTheme.palette.primary.contrastText }}
                      >
                        Más
                      </TableCell>
                    )}
                </TableRow>
              </TableHead>
              <TableBody>
                {documents.data && documents.data.length === 0 && (
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
                          No se encontraron documentos cargados
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
                {documents.data && documents.data.length > 0 && (
                  <>
                    {documents.data.map((document) => {
                      return (
                        <TableRow key={document.id}>
                          <TableCell>{new Date(document.publishdate).toLocaleString()}</TableCell>
                          <TableCell>
                            <a
                              href={
                                document.attachment.url
                                  ? document.attachment.url
                                  : `${APIConfig.baseUrl}/${params.championshipCode}/document/download/${document.id}`
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
                              {document.title}
                            </a>
                          </TableCell>
                          {cookies.UserData &&
                            roleHasPermission(cookies.UserData.role, EPermission.DeleteResult) && (
                              <TableCell>
                                <MoreActionsMenu menuItems={getMoreActionOptions(document.id)} />
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
      <NewDocument
        dialogIsOpen={newDocumentDialogIsOpen}
        dialogOnClose={() => {
          setNewDocumentDialogIsOpen(false);
        }}
      />
    </div>
  );
};

export default DocumentsPage;
