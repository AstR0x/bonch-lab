import React from 'react';
import { Route, RouteProps } from 'react-router';

export interface RouteWrapperProps extends RouteProps {
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
export const RouteWrapper: React.FC<RouteWrapperProps> = ({
  component: Component,
  layout: Layout,
  ...rest
}) => (
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
