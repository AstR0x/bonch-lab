import 'regenerator-runtime';

import { request } from '@common/utils';

import { api } from '../api';
import { RoleEnum } from '../types';

describe('auth api', () => {
  beforeEach(() => {
    request.get = jest.fn();
    request.post = jest.fn();
  });

  it('api.signUp should call request.post with correct params', async () => {
    const data = {
      codeword: 'IKB-73',
      name: 'Иван',
      surname: 'Сидоров',
      patronymic: 'Петрович',
      role: RoleEnum.Student,
      group: 'groupIdentifier',
      email: 'student@gmail.com',
      password: 'password',
    };

    await api.signUp(data);

    expect(request.post).toBeCalledWith({ url: 'auth/sign-up', data });
  });

  it('api.signIn should call request.post with correct params', async () => {
    const data = {
      email: 'student@gmail.com',
      password: 'password',
    };

    await api.signIn(data);

    expect(request.post).toBeCalledWith({ url: 'auth/sign-in', data });
  });

  it('api.signOut should call request.get ', async () => {
    await api.signOut();

    expect(request.get).toHaveBeenCalled();
  });
});
