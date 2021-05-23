import React, { useState } from 'react';

import { validators } from '@common/utils';
import { FormState, UseFormResult } from '@common/types';

/**
 * Хук управления данными форм
 *
 * @param initialState - начальное состояние формы
 * @returns состояние формы + набор методов для управления её состоянием
 */
export const useForm = <T extends FormState>(
  initialState: T,
): UseFormResult<T> => {
  const [state, setState] = useState(initialState);

  /**
   * Устанавливает значение поля
   *
   * @param name - название поля
   * @param value - значение поля
   */
  const setValue = (name: string, value: string | number | boolean) =>
    setState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        [name]: value,
      },
    }));

  /**
   * Сброс значений поля в объекте values
   *
   * @param name - название поля
   */
  const resetValue = (name: string) =>
    setState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        [name]: initialState.values[name],
      },
    }));

  /**
   * Сбрасывает состояние формы
   */
  const resetFormState = () => setState(initialState);

  /**
   * Обработка и валидация изменений в компоненте TextField
   */
  const onTextFieldChange = ({
    target: { name, value, required },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => {
      let hasError = false;

      const validator =
        (prevState.validators && prevState.validators[name]) ||
        validators[name as keyof typeof validators];

      if (required) {
        hasError = !Boolean(value);
      }

      if (validator) {
        hasError = !validator(value);
      }

      return {
        ...prevState,
        values: {
          ...prevState.values,
          [name]: value,
        },
        errors: {
          ...prevState.errors,
          [name]: hasError,
        },
      };
    });
  };

  /**
   * Обработка изменений в компоненте Select
   */
  const onSelectChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        [name]: value,
      },
    }));
  };

  /**
   * Обработка изменений в компоненте Checkbox
   */
  const onCheckboxChange = ({
    target: { name, value, checked },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        [name]: checked ? value : null,
      },
    }));
  };

  /**
   * Обработка изменений в файловом input
   */
  const onFileInputChange = ({
    target: { name, files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        [name]: files[0],
      },
    }));
  };

  return {
    formState: state,
    setFormState: setState,
    setValue,
    resetValue,
    resetFormState,
    onTextFieldChange,
    onSelectChange,
    onCheckboxChange,
    onFileInputChange,
  };
};
