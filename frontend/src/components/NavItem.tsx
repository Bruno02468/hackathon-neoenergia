import React from 'react';
import styled from '@emotion/styled';

type Props = {
  label: string;
  icon: Icons;
  isActive: boolean;
  onClick: () => void;
};

const Container = styled.div`
  padding: 8px 12px;
`;

const NavItem = ({ label, icon, isActive, onClick }: Props) => (
  <Container onClick={onClick}>
  <Icon name={icon} />{label}</Container>
);

export default NavItem;
