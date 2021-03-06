import { useState } from 'react';

interface UseModalResult {
  /** Модальное окно открыто ? */
  isOpened: boolean;
  /** Данные модального окна */
  content: any;
  /** Открывает модальное окно */
  openModal: () => void;
  /** Закрывает модальное окно */
  closeModal: () => void;
}

/**
 * Хук управления модальным окном
 *
 * @returns набор методов для управления модальным окном
 */
export const useModal = (): UseModalResult => {
  const [modalData, setModalData] = useState({
    isOpened: false,
    content: null,
  });

  /**
   * Открытие модального окна
   *
   * @param content - контент модального окна
   */
  const openModal = (content: any = null) =>
    setModalData({
      isOpened: true,
      content,
    });

  /**
   * Закрытие модального окна
   */
  const closeModal = () =>
    setModalData({
      isOpened: false,
      content: null,
    });

  return {
    isOpened: modalData.isOpened,
    content: modalData.content,
    openModal,
    closeModal,
  };
};
