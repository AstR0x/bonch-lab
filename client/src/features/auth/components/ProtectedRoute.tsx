import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import { URLS } from '@src/constants';

import { RouteWrapper, RouteWrapperProps, RoleEnum, selectors } from '../';

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
export const ProtectedRoute = ({ role, ...props }: ProtectedRouteProps) => {
  const isUserAuthorized = useSelector(selectors.isUserAuthorizedSelector);

  if (!isUserAuthorized) {
    return <Redirect to={URLS.AUTHORIZATION_PAGE} />;
  }

  return <RouteWrapper {...props} />;
};
