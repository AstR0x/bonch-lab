import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

import { Group } from '../types';

interface DeleteGroupModalProps {
  isOpened: boolean;
  deletableGroup: Group;
  onDeleteGroup: (id: string) => void;
  onClose: () => void;
}

/**
 * Модальное окно удаления группы
 *
 * @param isOpened - модальное окно открыто ?
 * @param deletableGroup - удаляемая группа
 * @param onDeleteGroup - обработчик кнопки удаления группы
 * @param onClose - закрывает модальное окно
 * @returns react-элемент
 */
export const DeleteGroupModal: React.FC<DeleteGroupModalProps> = ({
  isOpened,
  deletableGroup,
  onDeleteGroup,
  onClose,
}) => (
  <Dialog
    open={isOpened}
    onClose={onClose}
    transitionDuration={0}
    aria-labelledby="create-group-form-title"
  >
    <DialogTitle id="create-group-form-title">Удаление группы</DialogTitle>
    <DialogContent>
      Вы действительно хотите удалить группу &laquo;{deletableGroup?.name}
      &raquo;?
    </DialogContent>
    <DialogActions>
      <Button color="primary" onClick={() => onDeleteGroup(deletableGroup.id)}>
        Удалить
      </Button>
      <Button color="secondary" onClick={onClose}>
        Отмена
      </Button>
    </DialogActions>
  </Dialog>
);
