/* eslint-disable react/display-name */
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { SyntheticEvent } from 'react';

type Props = {
  data: {
    panelName: string;
    panelTitle: string;
    panelSecondaryTitle?: string;
    accordionContent: React.ReactElement;
  };
  expanded: string | false;
  handleChange: (
    value: string,
  ) => (event: SyntheticEvent<Element, Event>, expanded: boolean) => void;
};

const AudienceAccordion = ({ data, expanded, handleChange }: Props) => {
  return (
    <Accordion expanded={expanded === data.panelName} onChange={handleChange(data.panelName)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${data.panelName}bh-content`}
        id={`${data.panelName}bh-header`}
      >
        <Typography sx={{ width: '33%', flexShrink: 0 }}>{data.panelTitle}</Typography>
        {data.panelSecondaryTitle && (
          <Typography sx={{ color: 'text.secondary' }}>{data.panelSecondaryTitle}</Typography>
        )}
      </AccordionSummary>
      <AccordionDetails>{data.accordionContent}</AccordionDetails>
    </Accordion>
  );
};

export default AudienceAccordion;
