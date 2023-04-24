import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

const ClickableCard = ({
  route,
  title,
  description,
}: {
  route: string;
  title: string;
  description?: string;
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(route);
  };

  return (
    <Card sx={{ maxWidth: 450, borderRadius: '16px', margin: '1rem' }} onClick={handleCardClick}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export const MemoizedClickableCard = React.memo(ClickableCard);

export default MemoizedClickableCard;
