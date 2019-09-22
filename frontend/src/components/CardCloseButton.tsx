import React from 'react';
import styled from '@emotion/styled';
import Icon from 'components/Icon';

type Props = {
  onClick: () => void;
};

const Container = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
  padding: 8px;
`;

const CardCloseButton = ({ onClick }: Props) => (
  <Container onClick={onClick}>
    <Icon name="close" />
  </Container>
);

export default CardCloseButton;
