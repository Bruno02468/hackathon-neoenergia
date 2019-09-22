import React from 'react';
import styled from '@emotion/styled';
import Icon from 'components/Icon';
import { centerContent } from 'style/modifiers';
import appState from 'state/appState';
import { colorGradient } from 'style/theme';

const Container = styled.div`
  ${centerContent};
  position: absolute;
  top: 20px;
  right: ${42 - 16}px;
  height: 42px;
  background: #fff;
  border-radius: 100px;
`;

const ViewButton = styled.button`
  ${centerContent};
  padding: 0 16px;
  height: 100%;
  z-index: 1;

  span {
    transition: 240ms;
    margin-left: 8px;
  }

  svg {
    transition: 240ms;
  }
`;

const ActiveViewBg = styled.div`
  position: absolute;
  height: calc(100% - 4px * 2);
  width: 88px;
  left: 4px;
  border-radius: 100px;
  background: ${colorGradient()};
  transition: 240ms;
`;

const ViewToggle = () => {
  const [activeView, setActiveView] = appState.useStore('activeView');
  const mapIsActive = activeView === 'map';

  return (
    <Container>
      <ActiveViewBg
        style={{
          transform: mapIsActive ? 'translate3d(92px, 0, 0)' : undefined,
          width: mapIsActive ? 92 : undefined,
        }}
      />
      <ViewButton
        css={{
          width: 92,
          color: mapIsActive ? '#000' : '#fff',
          pointerEvents: !mapIsActive ? 'none' : undefined,
        }}
        onClick={() => setActiveView('list')}
      >
        <Icon name="list" size={18} color={mapIsActive ? '#000' : '#fff'} />
        <span>Lista</span>
      </ViewButton>
      <ViewButton
        css={{
          width: 100,
          color: !mapIsActive ? '#000' : '#fff',
          pointerEvents: mapIsActive ? 'none' : undefined,
        }}
        onClick={() => setActiveView('map')}
      >
        <Icon name="map" size={18} color={!mapIsActive ? '#000' : '#fff'} />
        <span>Mapa</span>
      </ViewButton>
    </Container>
  );
};

export default ViewToggle;
