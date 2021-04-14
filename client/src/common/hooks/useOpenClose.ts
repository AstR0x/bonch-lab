import { useState } from 'react';

interface UseOpenCloseResult {
  // Модальное окно открыто ?
  isOpened: boolean;
  // Открывает модальное окно
  open: () => void;
  // Закрывает модальное окно
  close: () => void;
}

/**
 * Хук открыть/закрыть. Используется для открытия/закрытия модальных окон и т.п.
 *
 * @param initialValue - начальное значение
 * @returns набор методов открыть/закрыть и тек. значение isOpened
 */
export const useOpenClose = (initialValue: boolean): UseOpenCloseResult => {
  const [isOpened, setIsOpened] = useState(initialValue);

  const open = () => setIsOpened(true);

  const close = () => setIsOpened(false);

  return {
    isOpened,
    open,
    close,
  };
};
