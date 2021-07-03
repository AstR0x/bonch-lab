import { createSlice } from '@reduxjs/toolkit';

import { config } from '@common/config';
import { setStoreField } from '@common/utils';
import { Teacher, Student } from '@features/users';

export interface AuthorizationState {
  /** Access токен */
  token: string;
  /** Данные пользователя */
  userData: Teacher | Student;
}

const initialState: AuthorizationState = {
  token: null,
  userData: null,
};

/**
 * Сброс данных авторизации
 *
 * @returns обновлённое состояние стора
 */
const resetAuthData = (): AuthorizationState => ({
  token: null,
  userData: null,
});

const authSlice = createSlice({
  name: config.modules.auth,
  initialState,
  reducers: {
    setToken: setStoreField('token'),
    setUserData: setStoreField('userData'),
    resetAuthData,
  },
});

export const { reducer: authReducer, actions } = authSlice;
