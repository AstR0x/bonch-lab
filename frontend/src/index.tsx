import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider, createMuiTheme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

import '@styles/main.css';

import { AppRoutes } from '@src/routes';
import { config } from '@common/config';
import { initProcessActions } from '@processes/init';
import configureStore, { history } from '@store';

const store = configureStore();
store.dispatch(initProcessActions.initApp());

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[700],
    },
  },
});

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <AppRoutes history={history} />
        </CssBaseline>
      </ThemeProvider>
    </Provider>,
    document.getElementById('app'),
  );
};

window.addEventListener('load', render);

if (config.environment !== 'production' && module.hot) {
  module.hot.accept('@src/routes', render);
}
