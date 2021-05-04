import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import { PATHS } from '@src/constants';

import { RouteWrapper, RouteWrapperProps } from './';
import { RoleEnum } from '../types';
import { selectors } from '../selectors';

interface ProtectedRouteProps extends RouteWrapperProps {
  roles: RoleEnum[];
}

/**
 * Компонент "Защищённый роут"
 * Редиректит на страницу "Авторизация", если пользователь не авторизован
 * Редиректит на стартовую страницу пользователя, если пользователь не обладает необходимой ролью
 *
 * @param roles - типы пользователя, для которых роут доступен (Student/Teacher)
 * @param props - свойства компонента
 * @returns react-компонент
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  roles,
  ...props
}) => {
  const isUserAuthorized = useSelector(selectors.isUserAuthorizedSelector);

  if (!isUserAuthorized) {
    return <Redirect to={PATHS.AUTHORIZATION_PAGE} />;
  }

  return <RouteWrapper {...props} />;
};
