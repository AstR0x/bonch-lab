import { DictionaryItem, DictionaryObj } from './types';

const dictionaryToObject = (dictionary: DictionaryItem[]): DictionaryObj =>
  dictionary.reduce((acc, { id, title }) => {
    acc[id] = title;

    return acc;
  }, {} as DictionaryObj);

export const utils = { dictionaryToObject };
