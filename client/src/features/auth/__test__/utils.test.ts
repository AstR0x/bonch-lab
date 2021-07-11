import { utils } from '../utils';
import { RoleEnum } from '../types';

describe('auth utils', () => {
  it('utils.isTeacher should return correct answer', () => {
    expect(utils.isTeacher(RoleEnum.Teacher)).toBeTruthy();

    expect(utils.isTeacher(RoleEnum.Student)).toBeFalsy();
  });

  it('utils.isStudent should return correct answer', () => {
    expect(utils.isStudent(RoleEnum.Student)).toBeTruthy();

    expect(utils.isStudent(RoleEnum.Teacher)).toBeFalsy();
  });
});
