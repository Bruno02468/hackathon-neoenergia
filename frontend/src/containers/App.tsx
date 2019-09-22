import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { fillContainer } from 'style/modifiers';
import { colorBg, fontPrimary } from 'style/theme';
import SideNav from 'containers/SideNav';
import Map from 'containers/Map';
import ListWrapper from 'containers/ListsContainer';
import CitySelector from 'containers/CitySelector';
import ViewToggle from 'containers/ViewToggle';
import DetailsCardContainer from 'containers/DetailsCardContainer';
import { fetchCities } from 'state/citiesState';
import { fetchEquipments } from 'state/equipmentsState';

const AppContainer = styled.div`
  ${fillContainer};

  background: ${colorBg};
  display: grid;
  grid-template-columns: 300px 1fr;
  font-family: ${fontPrimary};
  overflow: hidden;
`;

// TODO: Login

const App = () => {
  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <AppContainer>
      <SideNav />
      <div css={{ position: 'relative' }}>
        <Map />
        <ListWrapper />
        <CitySelector />
        <ViewToggle />
        <DetailsCardContainer />
      </div>
    </AppContainer>
  );
};

export default App;
