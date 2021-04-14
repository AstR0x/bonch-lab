import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RegistrationForm, SignUpPayload } from '@features/auth';
import { selectors as loadingSelectors, LOADERS } from '@features/loading';
import { actions as authActions } from '@processes/auth';

/**
 * Страница регистрации пользователя
 *
 * @returns react-элемент
 */
export const RegistrationPage: React.FC = () => {
  const dispatch = useDispatch();
  const isSignUpLoading = useSelector(
    loadingSelectors.isLoadingSelector(LOADERS.SIGN_UP_LOADING),
  );

  /**
   * Диспатчит экшен регистрации
   *
   * @param signUpPayload - данные регистрации
   */
  const handleSignUp = (signUpPayload: SignUpPayload) =>
    dispatch(authActions.signUp(signUpPayload));

  return (
    <RegistrationForm
      onSignUp={handleSignUp}
      isSignUpLoading={isSignUpLoading}
    />
  );
};
