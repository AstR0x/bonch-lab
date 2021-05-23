import { createSelector } from '@reduxjs/toolkit';
import * as R from 'ramda';

import { RootState } from '@store';
import { config } from '@common/config';

import { getFormattedDate, getShortName } from '@common/utils';
import { LabsState } from './ducks';
import { Lab, PopulatedLab } from './types';

/**
 * Селектор модуля лабораторных работ
 */
const labsModuleSelector = (state: RootState): LabsState =>
  R.pathOr(null, [config.modules.labs], state);

/**
 * Селектор списка лабораторных работ
 */
const labListSelector = createSelector(
  labsModuleSelector,
  (labsModule): Lab[] => R.pathOr([], ['labList'], labsModule),
);

/**
 * Селектор лабораторной работы
 */
const labSelector = createSelector(
  labsModuleSelector,
  (labsModule): PopulatedLab => R.pathOr(null, ['lab'], labsModule),
);

/**
 * Селектор лабораторной работы для отображения в интерфейсе
 */
const lab4InterfaceViewSelector = createSelector(
  labSelector,
  (lab) =>
    lab && {
      ...lab,
      comments: lab.comments.map(({ author, creationDate, ...rest }) => ({
        creationDate: getFormattedDate(creationDate),
        author: {
          ...author,
          shortName: getShortName({
            name: author.name,
            surname: author.surname,
            patronymic: author.patronymic,
          }),
        },
        ...rest,
      })),
    },
);

export const selectors = {
  labsModuleSelector,
  labListSelector,
  labSelector,
  lab4InterfaceViewSelector,
};
