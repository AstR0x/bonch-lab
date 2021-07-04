import { includeIn } from './index';

describe('includeIn - Метод возвращает новый метод который проверяет, есть ли значение в ключе объекта', () => {
  const hashMap = {
    name: 'Igor',
    age: 31,
    skills: ['js', 'html', 'css', 'react'],
  };

  const getValues = includeIn(hashMap);

  test('Простая проверка вхождения значения', () => {
    expect(getValues('react', ['skills'])).toBeTruthy();
    expect(getValues('js', ['skills'])).toBeTruthy();
  });

  test('Проверка не вхождения значения', () => {
    expect(getValues('php', ['skills'])).toBeFalsy();
    expect(getValues('java', ['skills'])).toBeFalsy();
  });
});
