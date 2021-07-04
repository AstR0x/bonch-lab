/** Элемент справочника */
export interface DictionaryItem {
  /** Идентификатор */
  id: string | number;
  /** Текст */
  title: string;
}

/** Структура тем/подтем/уровней */
export interface Structure {
  [key: number]: {
    title: string;
    subtopics: {
      [key: number]: {
        title: string;
        levels: {
          [key: number]: {
            title: string;
          };
        };
      };
    };
  };
}
