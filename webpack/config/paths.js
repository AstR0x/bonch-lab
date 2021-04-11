const path = require('path');

const appPaths = {
  // папка с исходниками приложения
  appDir: path.resolve(__dirname, '../../src'),
  // папка с общими элементами приложения (утилиты, компоненты и т.п.)
  appCommon: path.resolve(__dirname, '../../src/common'),
  // папка с модулями приложения
  appFeatures: path.resolve(__dirname, '../../src/features'),
  // папка с макетами приложения
  appLayouts: path.resolve(__dirname, '../../src/layouts'),
  // папка с конфигурацией redux-store приложения
  appStore: path.resolve(__dirname, '../../src/store'),
  // папка с процессами приложения
  appProcesses: path.resolve(__dirname, '../../src/processes'),
  // папка с контейнерами страниц приложения
  appPages: path.resolve(__dirname, '../../src/pages'),
  // папка с билдом приложения
  appDist: path.resolve(__dirname, '../../dist'),
  // папка с ресурсами приложения (картинками шрифтами и пр.)
  appAssets: path.resolve(__dirname, '../../puplic'),
  // папка со стилями
  appStyles: path.resolve(__dirname, '../../src/common/styles'),
  // точка входа в приложение
  appIndex: path.resolve(__dirname, '../../src/index.tsx'),
  // HTML шаблон приложения
  appHTMLTemplate: path.resolve(__dirname, '../../public/index.html'),
  // Favicon приложения
  appFavicon: path.resolve(__dirname, '../../dist/logo.png'),
  // путь к папке package.json
  appPackageJson: path.resolve(__dirname, '../../package.json'),
};

module.exports = appPaths;
