import React, { FC } from 'react';
import CardInfo from 'components/CardInfo';
import { CardContainerStyle } from '../components/CardContainerStyle';
import predicitonsState, { closePredictionCard } from 'state/predicitonsState';
import CardCloseButton from 'components/CardCloseButton';

// TODO: zoom to card on map

const PredictionCard = () => {
  const [selected] = predicitonsState.useStore('selected');
  const [predicitons] = predicitonsState.useStore('predicitons');

  if (selected === null) return null;

  const prediction = predicitons[selected];

  return (
    <CardContainerStyle>
      <CardCloseButton onClick={() => closePredictionCard()} />

      <CardInfo label="Risco">
        {prediction.type}
      </CardInfo>
      <CardInfo label="Equipamento">
        {prediction.equipment}
      </CardInfo>
      <CardInfo label="Região">

      </CardInfo>
      <CardInfo label="Causas">

      </CardInfo>
      <CardInfo label="Data da Previsão">

      </CardInfo>
    </CardContainerStyle>
  );
};

export default PredictionCard;
