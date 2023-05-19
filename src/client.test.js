import { getColorInfo, getColorSchema } from './client';

// const mock = jest.fn()
const initialColor = { r: 255, g: 0, b: 0, a: 1};

const testData = { color: 'blue', name: 'Lafarge' };

describe('Client test suite', () => {
 test('Check getColorInfo',  () => {
    const response = { json: jest.fn().mockResolvedValueOnce(testData) };
    global.fetch = jest.fn().mockResolvedValueOnce(response);

     // jest.fn().mockResolvedValueOnce()
     // jest.fn().mockRejectedValue()

    return getColorInfo(initialColor).then((data) => {
      expect(data).toEqual(testData);
    });
  });

  test('Check getColorSchema',  () => {
    const response = { json: jest.fn().mockResolvedValueOnce(testData) };
    global.fetch = jest.fn().mockResolvedValueOnce(response);

    return getColorSchema(initialColor).then((data) => {
      expect(data).toEqual(testData);
    });
  });
})

