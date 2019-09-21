import React from 'react';
import styled from '@emotion/styled';
import { colorGradient, textGradient, colorPrimary } from 'style/theme';
import Icon from 'components/Icon';
import NavItem from 'components/NavItem';

const Container = styled.div`
  background: #fff;
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.div`
  height: 28px;
  width: 180px;
  background: url('static/logo.png') no-repeat;
  background-size: contain;
`;

const AppTitle = styled.h1`
  color: ${colorPrimary};
  font-weight: 400;
  margin-top: 12px;
  font-size: 20px;
`;

const Nav = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 48px;
`;

const SideNav = () => {
  return (
    <Container>
      <Logo />
      <AppTitle>Gerenciador de Ocorrências</AppTitle>
      <Nav>
        <NavItem label="Previsão de Ocorrências">
          <Icon name="prediction" />
          Previsão de Ocorrências
        </NavItem>
        <NavItem>
          <Icon name="equipments" />
          Equipamentos
        </NavItem>
        <NavItem>
          <Icon name="error-outline" />
          Ocorrências
        </NavItem>
      </Nav>
    </Container>
  );
};

export default SideNav;
