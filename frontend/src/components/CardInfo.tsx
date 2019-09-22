import React, { FC } from 'react';
import styled from '@emotion/styled';
import { colorPrimary } from 'style/theme';


type Props = {
  label: string;
}

const Container = styled.div`
  width: 100%;
  margin-bottom: 32px;
  font-size: 14px;

  h1 {
    font-size: 16px;
    font-weight: 400;
    color: ${colorPrimary};
    margin-bottom: 16px;
  }
`;

const CardInfo: FC<Props> = ({ label, children }) => {


  return (
    <Container>
      <h1>{label}</h1>
      {children}
    </Container>
  );
};

export default CardInfo;
