import * as R from 'ramda';

interface GetShortNameParams {
  /* Имя */
  name: string;
  /* Фамилия */
  surname: string;
  /* Отчество */
  patronymic?: string;
}

/**
 * Возвращает строку с фамилией и инициалами
 *
 * @param name - имя
 * @param surname - фамилия
 * @param patronymic - отчество
 * @returns фамилия и инициалы
 */
export const getShortName = ({
  name,
  surname,
  patronymic,
}: GetShortNameParams): string => {
  return `${surname.trim()} ${R.head(name.trim())}. ${R.head(
    patronymic.trim(),
  )}.`;
};
