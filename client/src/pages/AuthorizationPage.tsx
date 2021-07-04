import React from 'react';
import { useDispatch } from 'react-redux';
import { Container } from '@material-ui/core';

import { AuthorizationForm, SignInPayload } from '@features/auth';
import { authProcessActions } from '@processes/auth';

/**
 * Страница "Авторизация"
 *
 * @returns react-элемент
 */
export const AuthorizationPage: React.FC = () => {
  const dispatch = useDispatch();

  /**
   * Обработчик кнопки авторизации
   *
   * @param signInPayload - данные авторизации
   */
  const handleSignIn = (signInPayload: SignInPayload) =>
    dispatch(authProcessActions.signIn(signInPayload));

  return (
    <Container maxWidth="xs">
      <AuthorizationForm onSignIn={handleSignIn} />
    </Container>
  );
};
