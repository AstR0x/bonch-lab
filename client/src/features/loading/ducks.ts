import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { config } from '@common/config';

export interface LoadingState {
  [key: string]: boolean;
}

const initialState = {};

/**
 * Устанавливает лоадер видимым
 *
 * @param state - стор модуля
 * @param payload - название лоадера
 * @returns новое состояние стора
 */
const toShowLoader = (
  state: LoadingState,
  { payload }: PayloadAction<string>,
) => ({
  ...state,
  [payload]: true,
});

/**
 * Устанавливает лоадер невидимым
 *
 * @param state - стор модуля
 * @param payload - название лоадера
 * @returns новое состояние стора
 */
const toHideLoader = (
  state: LoadingState,
  { payload }: PayloadAction<string>,
) => ({
  ...state,
  [payload]: false,
});

const loadingSlice = createSlice({
  name: config.modules.loading,
  initialState,
  reducers: {
    showLoader: toShowLoader,
    hideLoader: toHideLoader,
  },
});

export const loadingReducer = loadingSlice.reducer;

export const actions = {
  ...loadingSlice.actions,
};
