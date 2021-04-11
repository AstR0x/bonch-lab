import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { History, LocationState } from 'history';

import { AboutPage, HomePage } from '@pages';
import { MainLayout } from '@layouts';

interface AppRoutesProps<S = LocationState> {
  history: History<S>;
}

/**
 * @param {AppRoutesProps} props - пропсы компонента
 *
 * @returns {JSX.Element} Компонент с роутами приложения
 */
export function AppRoutes<S = LocationState>({
  history,
}: AppRoutesProps<S>): JSX.Element {
  return (
    <ConnectedRouter history={history}>
      <MainLayout>
        <Switch>
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </MainLayout>
    </ConnectedRouter>
  );
}
