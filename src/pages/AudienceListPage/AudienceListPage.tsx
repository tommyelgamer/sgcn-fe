import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Button, Divider, Skeleton, Stack, Typography } from '@mui/material';
import React from 'react';
import AudienceAccordion from '../../components/Accordions/AudienceAccordion';
import { useGetAllMinimalAudienceData } from '../../hooks/request/getAllMinimalAudienceData.hook';
import { useParams } from 'react-router-dom';
import { Audience } from '../../api/entities/requests/audience.entity';
import NewAudienceDialog from '../../components/Audiences/NewAudienceDialog';

const AudienceListPage = () => {
  const params = useParams<{ championshipCode: string }>();
  const minimalAudienceData = useGetAllMinimalAudienceData(params.championshipCode as string);

  if (minimalAudienceData.isError) console.error(minimalAudienceData.error);
  if (minimalAudienceData.data) {
    // console.log(minimalAudienceData.data);

    minimalAudienceData.data.sort(
      (a: Audience, b: Audience) => (b.id as number) - (a.id as number),
    );
  }

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleAccordionChange =
    (accordionName: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? accordionName : false);
    };

  return (
    <>
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ typography: 'h2' }}>Audiencias</Typography>
        </Box>
        {/* <Box sx={{ pt: { md: 6 }, pl: { xs: 0, md: 8 }, pr: { xs: 0, md: 8 } }}> */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant='contained'
            startIcon={<AddCircleIcon />}
            sx={{ mb: 2 }}
            onClick={() => console.log('Clicked')}
          >
            Solicitar una audiencia
          </Button>
        </Box>
        <Box sx={{ pl: { xs: 0, md: 8 }, pr: { xs: 0, md: 8 } }}>
          {minimalAudienceData.isLoading && <Skeleton variant='rectangular' height={250} />}
          {!minimalAudienceData.isLoading &&
            minimalAudienceData.data &&
            minimalAudienceData.data.map((audience: Audience) => (
              <AudienceAccordion
                key={audience.id}
                expanded={expanded}
                handleChange={handleAccordionChange}
                data={{
                  panelTitle: `Audiencia N°${audience.id}`,
                  panelSecondaryTitle: getAudienceStatusText(audience.status[0].status),
                  panelName: `audience-${audience.id}`,
                  accordionContent: (
                    <>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-evenly',
                          flexWrap: 'wrap',
                        }}
                      >
                        <Stack
                          sx={{
                            ml: '20px',
                            mr: '20px',
                            mt: '6px',
                            mb: '6px',
                          }}
                        >
                          <Typography sx={{ fontWeight: 'bold' }}>Protestante</Typography>
                          <Divider />
                          <Typography>{`${audience.requester.category} - ${audience.requester.sailNumber}`}</Typography>
                        </Stack>
                        <Stack
                          sx={{
                            ml: '20px',
                            mr: '20px',
                            mt: '6px',
                            mb: '6px',
                          }}
                        >
                          <Typography sx={{ fontWeight: 'bold' }}>Protestado/s</Typography>
                          <Divider />
                          {audience.participants.map((participant, i: number) => (
                            <Typography
                              key={i}
                            >{`${participant.category} - ${participant.sailNumber}`}</Typography>
                          ))}
                        </Stack>
                        {audience.witnesses.length > 0 && (
                          <Stack
                            sx={{
                              ml: '20px',
                              mr: '20px',
                              mt: '6px',
                              mb: '6px',
                            }}
                          >
                            <Typography sx={{ fontWeight: 'bold' }}>Testigo/s</Typography>
                            <Divider />
                            {audience.witnesses.map((witness, i: number) => (
                              <Typography
                                key={i}
                              >{`${witness.category} - ${witness.sailNumber}`}</Typography>
                            ))}
                          </Stack>
                        )}
                      </Box>
                      {audience.status[0].status === 'SCHEDULED' && (
                        <>
                          <Divider
                            sx={{
                              mt: '15px',
                            }}
                          />
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'start',
                              alignItems: 'start',
                              flexWrap: 'wrap',
                              flexDirection: 'column',
                              mt: '15px',
                            }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                ml: '20px',
                              }}
                            >
                              <Typography sx={{ fontWeight: 'bold' }}>
                                Lugar de la audiencia:
                              </Typography>
                              <Typography sx={{ ml: '5px' }}>{audience.status[0].place}</Typography>
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                ml: '20px',
                              }}
                            >
                              <Typography sx={{ fontWeight: 'bold' }}>
                                Horario de la audiencia:
                              </Typography>
                              <Typography sx={{ ml: '5px' }}>
                                {audience.status[0].scheduleTime}
                              </Typography>
                            </Box>
                            {audience.status[0].observation && (
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: { xs: 'column', md: 'row' },
                                  ml: '20px',
                                }}
                              >
                                <Typography sx={{ fontWeight: 'bold' }}>Observaciones:</Typography>
                                <Typography sx={{ ml: '5px' }}>
                                  {audience.status[0].observation}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </>
                      )}
                    </>
                  ),
                }}
              />
            ))}
        </Box>
      </Stack>
      <NewAudienceDialog open />
    </>
  );
};

export default AudienceListPage;

const getAudienceStatusText = (status: string): string => {
  switch (status) {
    case 'PENDING':
      return 'Pendiente';

    case 'SCHEDULED':
      return 'Planificada';

    case 'INPROGRESS':
      return 'En Progreso';

    case 'PROCCESSED':
      return 'Finalizada';

    case 'RETIRED':
      return 'Retirada';

    default:
      return 'ERROR';
  }
};
