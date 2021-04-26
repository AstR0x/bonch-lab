import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, LinearProgress } from '@material-ui/core';

import { AuthorizationForm, SignInPayload } from '@features/auth';
import { selectors as loadingSelectors, LOADERS } from '@features/loading';
import { actions as authActions } from '@processes/auth';

/**
 * Страница "Авторизация"
 *
 * @returns react-элемент
 */
export const AuthorizationPage: React.FC = () => {
  const dispatch = useDispatch();
  const isSignInLoading = useSelector(
    loadingSelectors.isLoadingSelector(LOADERS.SIGN_IN_LOADING),
  );

  /**
   * Диспатчит экшен авторизации
   *
   * @param signInPayload - данные авторизации
   */
  const handleSignIn = (signInPayload: SignInPayload) =>
    dispatch(authActions.signIn(signInPayload));

  return (
    <>
      {isSignInLoading && <LinearProgress />}
      <Container component="div" maxWidth="xs">
        <AuthorizationForm
          isSignInLoading={isSignInLoading}
          onSignIn={handleSignIn}
        />
      </Container>
    </>
  );
};
