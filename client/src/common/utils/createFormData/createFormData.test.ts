import { createFormData } from './index';

describe('createFormData tests', () => {
  it('should return empty FormData', () => {
    expect(createFormData({})).toEqual(new FormData());
  });

  it('should return formData with data', () => {
    const formData = new FormData();
    formData.append('a', 'foo');
    formData.append('b', 'bar');

    expect(
      createFormData({
        a: 'foo',
        b: 'bar',
      }),
    ).toEqual(formData);
  });
});
