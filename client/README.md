# bonch-lab-client

- [Описание](#Описание)
- [Основные технологии](#Основные-технологии)
- [Структура клиентской части](#Структура-фронтенда)

### Описание

Клиентская часть веб-приложения Bonch Lab.

### Основные технологии

- [Typescript](https://www.typescriptlang.org/)
- [React](https://ru.reactjs.org/)
- [Redux](https://redux.js.org/)
- [Redux-saga](https://redux-saga.js.org/)
- [React-router-dom](https://reactrouter.com/web/guides/quick-start)
- [Material-UI](https://material-ui.com/)
- [Ramda](https://ramdajs.com/)
- [Jest](https://jestjs.io/)

### Структура фронтенда

```
├─── src         : исходный код
|     ├─── common      : общие элементы приложения
|     |     ├─── components       : папка с общими компонентами
|     |     ├─── config           : папка с общими настройками приложения
|     |     ├─── hooks            : папка с общими React Hooks
|     |     ├─── messages         : папка с ui-сообщениями
|     |     ├─── sagas            : папка с общими редакс сагами
|     |     ├─── styles	          : папка со стилями приложения
|     |     ├─── types	          : папка с общими типами
|     |     └─── utils            : папка с общими утилитами приложения
|     |
|     ├─── features    : модули проекта
|     |     ├─── auth             : модуль авторизации и регистрации пользователей
|     |     ├─── dictionaries     : модуль справочников
|     |     ├─── errors           : модуль для работы с ошибками
|     |     ├─── groups           : модуль академических групп
|     |     ├─── labs             : модуль лабораторных работ
|     |     ├─── loading          : модуль для работы лоадера
|     |     ├─── navigation       : модуль с данными из react-router
|     |     ├─── notification     : модуль для работы с уведомлениями
|     |     └─── tasks.js         : модуль задач
|     |
|     ├─── layouts     : макеты страниц
|     |     ├─── MainLayout.tsx   : главный макет
|     |     ├─── SimpleLayout.tsx : упрощённый макет
|     |     └─── index.ts         : экспорт макетов
|     |
|     ├─── pages       : компоненты страниц
|     |     ├─── AuthorizationPage.jsx    : страница "Авторизация"
|     |     ├─── CreateGroupPage.jsx      : страница "Создание группы"
|     |     ├─── CreateTaskPage.jsx       : страница "Создание задачи"
|     |     ├─── EditGroupPage.jsx        : страница "Редактирование группы"
|     |     ├─── EditTaskPage.jsx         : страница "Редактирование задачи"
|     |     ├─── GroupPage.jsx            : страница "Группа"
|     |     ├─── HomePage.jsx             : страница "Главная страница"
|     |     ├─── JournalPage.jsx          : страница "Журнал группы"
|     |     ├─── LabPage.jsx              : страница "Лабораторная работа"
|     |     ├─── LabsPage.jsx             : страница "Лабораторные работы"
|     |     ├─── RegistrationPage.jsx     : страница "Регистрация"
|     |     ├─── TasksPage.jsx            : страница "Задачи"
|     |     └─── index.ts                 : экспорт страниц
|     |
|     ├─── processes   : бизнес-процессы приложения
|     |     ├─── auth         	 : процесс авторизации пользователя
|     |     ├─── dictionaries    : процесс работы со справочниками
|     |     ├─── groups          : процесс работы с академемическими группами
|     |     ├─── init         	 : процесс инициализации приложения
|     |     ├─── labs         	 : процесс работы с лабораторными работами
|     |     └─── templates       : процесс работы с шаблонами документов
|     |
|     ├─── store       : настройки redux
|     |     ├─── index.ts         : инициализация redux, подключение middlewares
|     |     ├─── root-reducer.ts  : главный редьюсер
|     |     └─── root-saga.ts     : главная сага
|     |
|     ├─── constants.ts : общие константы
|     |
|     ├─── routes.jsx   : настройка роутов приложения
|     |
|     └─── index.tsx    : главный файл
|
├─── webpack     : настройка webpack приложения
|     |
|     ├─── app          : папка с настройками webpack для приложения
|     |     ├─── develop.js     : файл с настройками webpack для dev-окружения
|     |     └─── production.js  : файл с настройками webpack для production-окружения
|     |
|     ├─── config       : папка с настройками webpack-приложения
|     |     ├─── paths.js        : файл с настройками путей webpack-приложения
|     |     ├─── settings.js     : файл с общими настройками приложения
|     |     ├─── index.ts        : файл с методом получения общих настроек по ключу
|     |     └─── dev-server      : папка с настройками webpack-dev-server
|     |          ├─── index.ts   : общие настройки webpack-dev-server
|     |          └─── proxy.js   : настройки proxy для webpack-dev-server
|     |
|     └─── common.js    : общие настройки webpack
|
├─── .babelrc        : файл с настройками Babel
├─── .editorconfig   : файл с настройками плагина EditorConfig
├─── .eslintignore   : файл с настройками игнорирования файлов eslint
├─── .eslintrc       : файл с настройками eslint
├─── .gitignore      : файл с настройками игнорирования файлов git
├─── .prettierrc     : файл с настройками prettier
├─── jest.config.js  : файл с настройками jest
├─── jest-base.js    : файл с базовыми настройками jest
├─── package.json    : файл с описанием зависимостей проекта и скриптами запуска
├─── tsconfig.json   : файл с настройками TypeScript
└─── README.md       : файл с описанием фронтенда
```
