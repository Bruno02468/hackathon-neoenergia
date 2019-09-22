import React, { FC } from 'react';
import CardInfo from 'components/CardInfo';
import { CardContainerStyle } from '../components/CardContainerStyle';
import predicitonsState, { closePredictionCard } from 'state/predicitonsState';
import CardCloseButton from 'components/CardCloseButton';
import equipmentsState from 'state/equipmentsState';

// TODO: zoom to card on map

const PredictionCard = () => {
  const [selected] = predicitonsState.useStore('selected');
  const [predicitons] = predicitonsState.useStore('predicitons');
  const [equipments] = equipmentsState.useStore('equipments');

  if (selected === null) return null;

  const prediction = predicitons[selected];

  const relEquipment = equipments && equipments.find(item => item.codigo === equipment);

  return (
    <CardContainerStyle>
      <CardCloseButton onClick={() => closePredictionCard()} />

      <CardInfo label="Risco">
        {relEquipment && relEquipment.type}
      </CardInfo>
      <CardInfo label="Equipamento">
        {relEquipment.equipment}
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
