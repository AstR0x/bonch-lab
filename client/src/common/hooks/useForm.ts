import React, { useState } from 'react';

import { FormState, UseFormResult } from '@common/types';
import { validators } from '@common/utils';

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
   * Сбрасывает значение поля в объекте values
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
   * Обрабатывает изменения в компоненте TextField с валидацией
   */
  const onTextFieldChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => {
      const validator =
        (prevState.validators && prevState.validators[name]) ||
        validators[name as keyof typeof validators];

      const hasError = validator ? Boolean(value) && !validator(value) : false;

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
   * Обрабатывает изменения в компоненте Select
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
   * Обрабатывает изменения в компоненте Checkbox
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

  return {
    formState: state,
    setFormState: setState,
    resetValue,
    resetFormState,
    onTextFieldChange,
    onSelectChange,
    onCheckboxChange,
  };
};
