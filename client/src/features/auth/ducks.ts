import { createSlice } from '@reduxjs/toolkit';

import { config } from '@common/config';
import { setStoreField } from '@common/utils';

export interface AuthorizationState {
  // Access токен
  token: string;
  // Данные пользователя
  userData: any;
}

const initialState: AuthorizationState = {
  token: null,
  userData: null,
};

/**
 * Сбрасывает данные авторизации
 *
 * @returns обновлённое состояние стора
 */
const toResetAuthData = (): AuthorizationState => ({
  token: null,
  userData: null,
});

const authSlice = createSlice({
  name: config.modules.auth,
  initialState,
  reducers: {
    setToken: setStoreField('token'),
    setUserData: setStoreField('userData'),
    resetAuthData: toResetAuthData,
  },
});

export const authReducer = authSlice.reducer;

export const actions = {
  ...authSlice.actions,
};
