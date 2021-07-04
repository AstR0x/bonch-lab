import { createSlice } from '@reduxjs/toolkit';

import { config } from '@common/config';

export interface LoadingState {
  /** Происходит загрузка ? */
  isLoading: boolean;
}

const initialState = { isLoading: false };

/**
 * Установка лоадера видимым
 *
 * @param state - стор модуля
 * @returns новое состояние стора
 */
const showLoader = (state: LoadingState) => ({
  ...state,
  isLoading: true,
});

/**
 * Установка лоадера невидимым
 *
 * @param state - стор модуля
 * @returns новое состояние стора
 */
const hideLoader = (state: LoadingState) => ({
  ...state,
  isLoading: false,
});

const loadingSlice = createSlice({
  name: config.modules.loading,
  initialState,
  reducers: {
    showLoader,
    hideLoader,
  },
});

export const { reducer: loadingReducer, actions } = loadingSlice;
