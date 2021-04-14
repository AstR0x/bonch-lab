import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CssBaseline } from '@material-ui/core';

import '@styles/main.css';

import { AppRoutes } from '@src/routes';
import { config } from '@common/config';
import { actions as initProcessActions } from '@processes/init';
import configureStore, { history } from '@store';

const store = configureStore();
store.dispatch(initProcessActions.initApp());

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <CssBaseline>
        <AppRoutes history={history} />
      </CssBaseline>
    </Provider>,
    document.getElementById('app'),
  );
};

window.addEventListener('load', render);

if (config.environment !== 'production' && module.hot) {
  module.hot.accept('@src/routes', render);
}
