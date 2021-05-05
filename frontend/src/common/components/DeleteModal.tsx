import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

interface DeleteGroupModalProps {
  isOpened: boolean;
  modalTitle: string;
  modalContent: string;
  onDeleteItem: () => void;
  onClose: () => void;
}

/**
 * Модальное окно удаления
 *
 * @param isOpened - модальное окно открыто ?
 * @param modalTitle - заголовок модального окна
 * @param modalContent - контент модального окна
 * @param onDeleteItem - обработчик кнопки удаления
 * @param onClose - закрывает модальное окно
 * @returns react-элемент
 */
export const DeleteModal: React.FC<DeleteGroupModalProps> = ({
  isOpened,
  modalTitle,
  modalContent,
  onDeleteItem,
  onClose,
}) => (
  <Dialog
    open={isOpened}
    onClose={onClose}
    transitionDuration={0}
    aria-labelledby="delete-modal-title"
  >
    <DialogTitle id="create-group-form-title">{modalTitle}</DialogTitle>
    <DialogContent>{modalContent}</DialogContent>
    <DialogActions>
      <Button color="secondary" onClick={onClose}>
        Отмена
      </Button>
      <Button color="primary" onClick={onDeleteItem}>
        Удалить
      </Button>
    </DialogActions>
  </Dialog>
);
