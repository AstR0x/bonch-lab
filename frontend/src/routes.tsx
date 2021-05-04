import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { History, LocationState } from 'history';

import { PATHS } from '@src/constants';
import { NotAuthRoute, ProtectedRoute, RoleEnum } from '@features/auth';
import {
  AuthorizationPage,
  RegistrationPage,
  CreateGroupPage,
  EditGroupPage,
  GroupPage,
  HomePage,
  TopicPage,
} from '@pages';
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
          path={PATHS.AUTHORIZATION_PAGE}
          component={AuthorizationPage}
          layout={SimpleLayout}
        />
        <NotAuthRoute
          exact
          path={PATHS.REGISTRATION_PAGE}
          component={RegistrationPage}
          layout={SimpleLayout}
        />
        <ProtectedRoute
          exact
          path={PATHS.HOME_PAGE}
          roles={[RoleEnum.Teacher, RoleEnum.Student]}
          component={HomePage}
          layout={MainLayout}
        />
        <ProtectedRoute
          exact
          path={PATHS.CREATE_GROUP_PAGE}
          roles={[RoleEnum.Teacher]}
          component={CreateGroupPage}
          layout={MainLayout}
        />
        <ProtectedRoute
          exact
          path={PATHS.EDIT_GROUP_PAGE}
          roles={[RoleEnum.Teacher]}
          component={EditGroupPage}
          layout={MainLayout}
        />
        <ProtectedRoute
          exact
          path={PATHS.GROUP_PAGE}
          roles={[RoleEnum.Teacher]}
          component={GroupPage}
          layout={MainLayout}
        />
        <ProtectedRoute
          exact
          path={PATHS.TOPIC_PAGE}
          roles={[RoleEnum.Teacher]}
          component={TopicPage}
          layout={MainLayout}
        />
        <Route path="*" render={() => <Redirect to={PATHS.HOME_PAGE} />} />
      </Switch>
    </ConnectedRouter>
  );
}
