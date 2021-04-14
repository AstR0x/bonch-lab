import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, RouteProps, Redirect } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { History, LocationState } from 'history';

import { URLS } from '@src/constants';
import { selectors as authSelectors } from '@features/auth';
import { RoleEnum } from '@features/auth/types';
import { AuthorizationPage, RegistrationPage, HomePage } from '@pages';
import { SimpleLayout, MainLayout } from '@layouts';

interface RouteWrapperProps extends RouteProps {
  layout: RouteProps['component'];
}

/**
 * Обертка над компонентом Route с возможность добавления layout
 *
 * @param Component - компонент
 * @param Layout - layout компонента
 * @param rest - остальные параметры
 * @returns react-компонент
 */
const RouteWrapper = ({
  component: Component,
  layout: Layout,
  ...rest
}: RouteWrapperProps) => (
  <Route
    {...rest}
    render={(props) =>
      Layout ? (
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      ) : (
        <Component {...props} />
      )
    }
  />
);

interface ProtectedRouteProps extends RouteWrapperProps {
  role: RoleEnum;
}

/**
 * Компонент "Защищённый роут"
 * Редиректит на страницу "Авторизация", если пользователь не авторизован
 * Редиректит на стартовую страницу пользователя, если пользователь не обладает необходимой ролью
 *
 * @param role - тип пользователя, для которых роут доступен (student/teacher)
 * @param props - свойства компонента
 * @returns react-компонент
 */
const ProtectedRoute = ({ role, ...props }: ProtectedRouteProps) => {
  const isUserAuthorized = useSelector(authSelectors.isUserAuthorizedSelector);

  if (!isUserAuthorized) {
    return <Redirect to={URLS.AUTHORIZATION_PAGE} />;
  }

  return <RouteWrapper {...props} />;
};

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
        <RouteWrapper
          exact
          path={URLS.AUTHORIZATION_PAGE}
          component={AuthorizationPage}
          layout={SimpleLayout}
        />
        <RouteWrapper
          exact
          path={URLS.REGISTRATION_PAGE}
          component={RegistrationPage}
          layout={SimpleLayout}
        />
        <RouteWrapper exact path="/" component={HomePage} layout={MainLayout} />
      </Switch>
    </ConnectedRouter>
  );
}
