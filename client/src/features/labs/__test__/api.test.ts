import 'regenerator-runtime';
import * as R from 'ramda';

import { request, createFormData } from '@common/utils';

import { api } from '../api';
import { LabStatusEnum } from '../types';

describe('labs api', () => {
  const id = 'identifier';

  request.get = jest.fn();
  request.post = jest.fn();
  request.patch = jest.fn();

  it('api.getLabList should call request.get with correct params', async () => {
    const params = {
      topic: 1,
      subtopic: 1,
      level: 1,
    };

    await api.getLabList(params);

    expect(request.get).toBeCalledWith({ url: 'labs', config: { params } });
  });

  it('api.getLab should call request.get with correct url', async () => {
    await api.getLab(id);

    expect(request.get).toBeCalledWith({ url: `labs/${id}` });
  });

  it('api.updateLab should call request.patch with correct params', async () => {
    const updatePayload = { id, status: LabStatusEnum.Completed };

    await api.updateLab(updatePayload);

    expect(request.patch).toBeCalledWith({
      url: `labs/update/${id}`,
      data: R.omit(['id'], updatePayload),
    });
  });

  it('api.createComment should call request.post with correct params', async () => {
    const commentPayload = { id, message: 'Требуется добавить отчёт!' };

    await api.createComment(commentPayload);

    expect(request.post).toBeCalledWith({
      url: `labs/${id}/comments/create`,
      data: R.omit(['id'], commentPayload),
    });
  });

  it('api.uploadReport should call request.post with correct params', async () => {
    const report = new File(['report'], 'report.docx');
    const formData = createFormData({ report });

    await api.uploadReport(id, report);

    expect(request.post).toBeCalledWith({
      url: `labs/${id}/report/upload`,
      data: formData,
    });
  });

  it('api.downloadReport should call request.get with correct params', async () => {
    await api.downloadReport(id);

    expect(request.get).toBeCalledWith({
      url: `labs/${id}/report/download`,
      config: { responseType: 'arraybuffer' },
    });
  });
});
