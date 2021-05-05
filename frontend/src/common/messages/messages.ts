const createUiMessages = () => ({
  btnSubmit: 'Отправить',
  btnCancel: 'Отменить',
  helperTexts: {
    name: 'Имя должно содержать только кириллицу и начинаться с большой буквы',
    surname:
      'Фамилия должна содержать только кириллицу и начинаться с большой буквы',
    patronymic:
      'Отчество должно содержать только кириллицу и начинаться с большой буквы',
    codeword: 'Кодовое слово не должно быть пустым',
    group: { name: 'Пример названия группы: "ИКПИ-71"' },
    email: 'Введите корректную почту',
    password:
      'Пароль должен содержать не менее 8 знаков, среди которых буквы и цифры',
    required: 'Поле должно быть заполнено',
  },
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
