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
   * Диспатчит экшен авторизации
   *
   * @param signInPayload - данные авторизации
   */
  const handleSignIn = (signInPayload: SignInPayload) =>
    dispatch(authProcessActions.signIn(signInPayload));

  return (
    <Container component="div" maxWidth="xs">
      <AuthorizationForm onSignIn={handleSignIn} />
    </Container>
  );
};
