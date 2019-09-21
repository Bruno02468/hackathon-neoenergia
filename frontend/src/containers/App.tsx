import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { fillContainer } from 'style/modifiers';
import { colorBg, fontPrimary } from 'style/theme';
import SideNav from 'containers/SideNav';

const AppContainer = styled.div`
  ${fillContainer};

  background: ${colorBg};
  display: grid;
  grid-template-columns: 356px 1fr;
  font-family: ${fontPrimary};
`;

// TODO: Login

const App = () => {
  // const [activeTab] = appState.useStore('activeTab');

  useEffect(() => {

  }, []);

  return (
    <AppContainer>
      <SideNav />
      <div>
        {/* list */}
        {/* map */}
        {/* details card */}
      </div>
    </AppContainer>
  );
};

export default App;
