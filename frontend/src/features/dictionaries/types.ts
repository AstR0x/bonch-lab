/** Элемент справочника */
export interface DictionaryItem {
  /** Идентификатор */
  id: string | number;
  /** Текст */
  title: string;
}

/** Справочник, преобразованный в объект */
export type DictionaryObj = Record<
  DictionaryItem['id'],
  DictionaryItem['title']
>;
