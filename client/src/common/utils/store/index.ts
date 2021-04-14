import { PayloadAction } from '@reduxjs/toolkit';

/**
 * Установка поля стора
 * @returns новое состояние стора модуля
 * @param fieldName - имя поля стора
 */
export const setStoreField = (fieldName: string) => (
  state: any,
  { payload }: PayloadAction<any>,
) => ({
  ...state,
  [fieldName]: payload,
});
