import styled from '@emotion/styled';
import NavItem from 'components/NavItem';
import React from 'react';
import { circle, letterSpacing } from 'style/helpers';
import { colorPrimary } from 'style/theme';
import appState from 'state/appState';
import predicitonsState from 'state/predicitonsState';
import equipmentsState from 'state/equipmentsState';

const Container = styled.div`
  background: #fff;
  padding: 24px;
  display: flex;
  z-index: 1;
  flex-direction: column;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  height: 24px;
  margin-top: -8px;
  width: 180px;
  background: url('static/logo.png') no-repeat;
  background-size: contain;
`;

const AppTitle = styled.h1`
  ${letterSpacing(8)};
  color: ${colorPrimary};
  font-weight: 400;
  margin-top: 8px;
  font-size: 14px;
  text-transform: uppercase;
`;

const Nav = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 48px;
`;

const Avatar = styled.div`
  ${circle(24)};
  margin-right: 12px;
  background: url('static/avatar-example.png') no-repeat;
  background-size: cover;
`;

const SideNav = () => {
  const [activeSection, setActiveSection] = appState.useStore('activeSection');

  function setSection(section: appState['activeSection']) {
    setActiveSection(section);
    if (
      predicitonsState.getState().selected !== null
      || equipmentsState.getState().selected !== null
    ) {
      appState.setKey('activeView', appState.getState().viewUsedBeforeShowCard);
    }

    if (activeSection === 'prediction') {
      predicitonsState.setKey('selected', null);
    } else if (activeSection === 'equipments') {
      equipmentsState.setKey('selected', null);
    }
  }

  return (
    <Container>
      <Logo />
      <AppTitle>Gerenciador de Ocorrências</AppTitle>
      <Nav>
        <NavItem
          icon="prediction"
          label="Previsão de Ocorrências"
          isActive={activeSection === 'prediction'}
          onClick={() => setSection('prediction')}
        />
        <NavItem
          icon="equipments"
          label="Equipamentos"
          isActive={activeSection === 'equipments'}
          onClick={() => setSection('equipments')}
        />
        {/* <NavItem
          icon="error-outline"
          label="Ocorrências"
          isActive={activeSection === 'occurrences'}
          onClick={() => setSection('occurrences')}
        /> */}
      </Nav>

      <NavItem label="Vitor Ribeiro" alignBottom>
        <Avatar />
      </NavItem>
      <NavItem icon="logout" label="Sair" />
    </Container>
  );
};

export default SideNav;
