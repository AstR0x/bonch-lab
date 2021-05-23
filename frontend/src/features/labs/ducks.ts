import { createSlice } from '@reduxjs/toolkit';

import { config } from '@common/config';
import { setStoreField } from '@common/utils';

import { Lab, PopulatedLab } from './types';

export interface LabsState {
  /** Список лабораторных работ */
  labList: Lab[];
  /** Лабораторная работа */
  lab: PopulatedLab;
}

const initialState: LabsState = {
  labList: null,
  lab: null,
};

/**
 * Удаление лабораторной
 *
 * @param state - состояние стора модуля
 */
const deleteLab = (state: LabsState) => {
  state.lab = null;
};

const labsSlice = createSlice({
  name: config.modules.labs,
  initialState,
  reducers: {
    setLabList: setStoreField('labList'),
    setLab: setStoreField('lab'),
    deleteLab,
  },
});

export const { reducer: labsReducer, actions } = labsSlice;
