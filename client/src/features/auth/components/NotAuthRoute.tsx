import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import { PATHS } from '@src/constants';

import { RouteWrapper, RouteWrapperProps } from './RouteWrapper';
import { selectors } from '../selectors';

/**
 * Компонент "Неавторизованный роут" даёт доступ к роуту,
 * если пользователь не авторизован
 *
 * @param props - свойства компонента
 * @returns react-элемент
 */
export const NotAuthRoute: React.FC<RouteWrapperProps> = ({ ...props }) => {
  const isUserAuthorized = useSelector(selectors.isUserAuthorizedSelector);

  if (isUserAuthorized) {
    return <Redirect to={PATHS.HOME_PAGE} />;
  }

  return <RouteWrapper {...props} />;
};
