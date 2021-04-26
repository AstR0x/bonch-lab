import React from 'react';
import { Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { History, LocationState } from 'history';

import { URLS } from '@src/constants';
import { NotAuthRoute, ProtectedRoute, RoleEnum } from '@features/auth';
import { AuthorizationPage, RegistrationPage, GroupsPage } from '@pages';
import { MainLayout, SimpleLayout } from '@layouts';

interface AppRoutesProps<S = LocationState> {
  history: History<S>;
}

/**
 * @param props - пропсы компонента
 * @returns Компонент с роутами приложения
 */
export function AppRoutes<S = LocationState>({
  history,
}: AppRoutesProps<S>): JSX.Element {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <NotAuthRoute
          exact
          path={URLS.AUTHORIZATION_PAGE}
          component={AuthorizationPage}
          layout={SimpleLayout}
        />
        <NotAuthRoute
          exact
          path={URLS.REGISTRATION_PAGE}
          component={RegistrationPage}
          layout={SimpleLayout}
        />
        <ProtectedRoute
          exact
          path={URLS.GROUPS_PAGE}
          role={RoleEnum.teacher}
          component={GroupsPage}
          layout={MainLayout}
        />
      </Switch>
    </ConnectedRouter>
  );
}
