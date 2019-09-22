import React, { FC } from 'react';
import styled from '@emotion/styled';
import CardInfo from 'components/CardInfo';
import { CardContainerStyle } from 'components/CardContainerStyle';

const EquipmentCard = () => {


  return (
    <CardContainerStyle>
      <CardInfo label="Risco">
        ALTO
      </CardInfo>
      <CardInfo label="Equipamento">
        AGV01826
      </CardInfo>
      <CardInfo label="Tipo">
        CC
      </CardInfo>
      <CardInfo label="Fase">
        ABC
      </CardInfo>
      <CardInfo label="Clientes">
        1200
      </CardInfo>
    </CardContainerStyle>
  );
};

export default EquipmentCard;
