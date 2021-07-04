import { createAction } from '@reduxjs/toolkit';

/**
 * Экшен удаления студента
 */
const deleteStudent = createAction<string>('deleteStudent');

export const actions = {
  deleteStudent,
};
