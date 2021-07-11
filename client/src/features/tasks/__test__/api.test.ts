import 'regenerator-runtime';
import * as R from 'ramda';

import { request, createFormData } from '@common/utils';

import { api } from '../api';

describe('tasks api', () => {
  const id = 'identifier';

  request.get = jest.fn();
  request.post = jest.fn();
  request.patch = jest.fn();
  request.delete = jest.fn();

  it('api.getTaskList should call request.get with correct params', async () => {
    const params = {
      topic: 1,
      subtopic: 1,
      level: 1,
    };

    await api.getTaskList(params);

    expect(request.get).toBeCalledWith({ url: 'tasks', config: { params } });
  });

  it('api.getTask should call request.get with correct url', async () => {
    await api.getTask(id);

    expect(request.get).toBeCalledWith({ url: `tasks/${id}` });
  });

  it('api.deleteTask should call request.delete with correct url', async () => {
    await api.deleteTask(id);

    expect(request.delete).toBeCalledWith({ url: `tasks/delete/${id}` });
  });

  it('api.createTask should call request.post with correct params', async () => {
    const createTaskPayload = {
      topic: 3,
      subtopic: 1,
      level: 1,
      formulation: 'Написать функцию, возводящую в квадрат элементы массива',
      attachment: new File(['lorem'], 'attachment.docx'),
    };
    const formData = createFormData(createTaskPayload);

    await api.createTask(createTaskPayload);

    expect(request.post).toBeCalledWith({
      url: 'tasks/create',
      data: formData,
    });
  });

  it('api.updateTask should call request.patch with correct params', async () => {
    const updateTaskPayload = { id, topic: 2 };
    const formData = createFormData(R.omit(['id'], updateTaskPayload));

    await api.updateTask(updateTaskPayload);

    expect(request.patch).toBeCalledWith({
      url: `tasks/update/${id}`,
      data: formData,
    });
  });

  it('api.downloadTaskAttachment should call request.get with correct params', async () => {
    await api.downloadTaskAttachment(id);

    expect(request.get).toBeCalledWith({
      url: `tasks/${id}/attachment/download`,
      config: { responseType: 'arraybuffer' },
    });
  });
});
