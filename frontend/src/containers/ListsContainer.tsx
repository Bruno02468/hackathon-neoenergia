import React from 'react';
import styled from '@emotion/styled';
import { fillContainer, centerContent } from 'style/modifiers';
import { colorBg } from 'style/theme';
import PredictionList from 'containers/PredictionList';
import appState from 'state/appState';
import EquipmentsList from 'containers/EquipmentsList';
import OccurrencesList from 'containers/OccurrencesList';

const Container = styled.div`
  ${fillContainer};
  ${centerContent};
  background: ${colorBg};
`;

const ListWrapper = () => {
  const [activeSection] = appState.useStore('activeSection');
  const [activeView] = appState.useStore('activeView');

  return activeView === 'list' ? (
    <Container>
      {activeSection === 'prediction' && <PredictionList />}
      {activeSection === 'equipments' && <EquipmentsList />}
      {activeSection === 'occurrences' && <OccurrencesList />}
    </Container>
  ) : null;
};

export default ListWrapper;
