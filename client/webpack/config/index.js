const merge = require('merge');
const { pathOr } = require('ramda');

const settings = require('./settings');
const paths = require('./paths');
const devServer = require('./dev-server');

const config = merge(settings, paths, devServer);

/**
 * Получение настроек
 *
 * @param path - путь до настройки
 * @param defaultValue - что вернется по умолчанию
 * @param separator - разделитель
 *
 * @returns значение настройки
 */
module.exports = (path, defaultValue = '', separator = '.') => {
  const pathSettings = path.split(separator);
  return pathOr(defaultValue, pathSettings, config);
};
