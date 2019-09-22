import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { initializeMap } from 'utils/map';
import { fillContainer } from 'style/modifiers';

const Container = styled.div`
  ${fillContainer};
  z-index: 0;
`;

const Map = () => {
  useEffect(() => {
    initializeMap();
  }, []);

  return (
    <Container id="map-container" />
  );
};

export default Map;
