import * as React from 'react';
import { hot } from 'react-hot-loader/root';

import App from 'containers/App';
import GlobalStyle from 'style/GlobalStyle';
import DebugLayout from 'style/DebugLayout';

const Root = () => (
  <React.StrictMode>
    {__DEV__ && <DebugLayout />}
    <GlobalStyle />
    <App />
  </React.StrictMode>
);

export default hot(Root);
