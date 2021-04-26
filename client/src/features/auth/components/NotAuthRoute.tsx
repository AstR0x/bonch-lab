import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import { URLS } from '@src/constants';

import { RouteWrapper, RouteWrapperProps, selectors } from '../';

/**
 * Компонент "Неавторизованный роут" даёт доступ к роуту,
 * если пользователь не авторизован
 *
 * @param props - свойства компонента
 * @returns react-компонент
 */
export const NotAuthRoute = ({ ...props }: RouteWrapperProps) => {
  const isUserAuthorized = useSelector(selectors.isUserAuthorizedSelector);

  if (isUserAuthorized) {
    return <Redirect to={URLS.GROUPS_PAGE} />;
  }

  return <RouteWrapper {...props} />;
};
