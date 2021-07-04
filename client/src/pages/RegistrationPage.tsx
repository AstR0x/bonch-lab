import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from '@material-ui/core';

import { RegistrationForm, SignUpPayload } from '@features/auth';
import { dictionariesProcessActions } from '@processes/dictionaries';
import { authProcessActions } from '@processes/auth';

/**
 * Страница "Регистрация"
 *
 * @returns react-элемент
 */
export const RegistrationPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dictionariesProcessActions.getGroupsDict());
  }, []);

  /**
   * Обработчик кнопки регистрации
   *
   * @param signUpPayload - данные регистрации
   */
  const handleSignUp = (signUpPayload: SignUpPayload) =>
    dispatch(authProcessActions.signUp(signUpPayload));

  return (
    <Container component="div" maxWidth="xs">
      <RegistrationForm onSignUp={handleSignUp} />
    </Container>
  );
};
