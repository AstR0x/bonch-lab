import * as React from 'react';

export interface HandleWorkerPayload {
  worker: (...args: any[]) => any;
  payload?: any;
  loader?: string;
}

export interface FormState {
  values: {
    [key: string]: string;
  };
  errors?: {
    [key: string]: boolean;
  };
  helperTexts?: {
    [key: string]: string;
  };
  validators?: {
    [key: string]: (value: string) => boolean;
  };
}

export interface UseFormResult<T> {
  // Состояние формы
  formState: T;
  // Устанавливает состояние формы
  setFormState: (state: T) => void;
  // Сбрасывает значение поля в объекте values
  resetValue: (key: string) => void;
  // Сбрасывает данные формы
  resetFormState: () => void;
  // Обработчик изменений компонента TextField
  onTextFieldChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // Обработчик изменений компонента Select
  onSelectChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // Обработчик изменений компонента Checkbox
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
