import { Grid } from '@mui/material';
import React from 'react';
import CardInfo, { CardData } from '../Cards/CardInfo';

interface Props {
  cardData: CardData[] | undefined | null;
  cardDataLength: number;
  isLoading: boolean;
  error: string | null;
}

const CardGenerator: React.FC<Props> = (props) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{
        xs: 1,
        sm: props.cardDataLength * 2,
        md: props.cardDataLength * 2,
      }}
    >
      {Array.from({ length: props.cardDataLength }).map((_, i) => (
        <Grid key={i} item xs={1} sm={props.cardDataLength} md={2}>
          <CardInfo
            key={i}
            error={props.error}
            isLoading={props.isLoading}
            data={props.cardData ? props.cardData[i] : null}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGenerator;
