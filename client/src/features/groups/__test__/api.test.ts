import 'regenerator-runtime';
import * as R from 'ramda';

import { request } from '@common/utils';

import { api } from '../api';

describe('groups api', () => {
  const id = 'identifier';

  request.get = jest.fn();
  request.post = jest.fn();
  request.patch = jest.fn();
  request.delete = jest.fn();

  it('api.getGroupList should call request.get with correct url', async () => {
    await api.getGroupList();

    expect(request.get).toBeCalledWith({ url: 'groups' });
  });

  it('api.getGroup should call request.get with correct url', async () => {
    await api.getGroup(id);

    expect(request.get).toBeCalledWith({ url: `groups/${id}` });
  });

  it('api.createGroup should call request.post with correct params', async () => {
    const createGroupPayload = {
      name: 'ИКПИ-71',
      codeword: 'IKPI-71',
    };

    await api.createGroup(createGroupPayload);

    expect(request.post).toBeCalledWith({
      url: 'groups/create',
      data: createGroupPayload,
    });
  });

  it('api.updateGroup should call request.patch with correct params', async () => {
    const updateGroupPayload = {
      id,
      name: 'ИКПИ-72',
      codeword: 'IKPI-72',
    };

    await api.updateGroup(updateGroupPayload);

    expect(request.patch).toBeCalledWith({
      url: `groups/update/${id}`,
      data: R.omit(['id'], updateGroupPayload),
    });
  });

  it('api.deleteGroup should call request.delete with correct url', async () => {
    await api.deleteGroup(id);

    expect(request.delete).toBeCalledWith({ url: `groups/delete/${id}` });
  });
});
