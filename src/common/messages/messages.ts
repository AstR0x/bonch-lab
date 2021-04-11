const createUiMessages = () => ({
  btnSubmit: 'Отправить',
  btnCancel: 'Отменить',
  requestAccessError: {
    title: 'Ошибка доступа',
    message: 'У вас нет прав на просмотр данного ресурса',
  },
  modalText: (txt: string): string => `Получение текста сообщения ${txt}`,
});

/**
 * Сообщение для вывода на UI
 */
export const uiMessages: Readonly<ReturnType<
  typeof createUiMessages
>> = createUiMessages();
