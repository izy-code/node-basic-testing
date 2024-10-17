import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const MOCKED_RELATIVE_PATH = '/posts/1';
const MOCKED_RESPONSE_DATA = { id: 1 };

jest.mock('lodash', () => ({
  throttle: (fn: () => unknown) => fn,
}));

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(MOCKED_RELATIVE_PATH);

    expect(axios.create).toHaveBeenCalledWith({ baseURL: BASE_URL });
  });

  test('should perform request to correct provided url', async () => {
    const mockedGet = jest.fn().mockResolvedValue({ data: {} });

    axios.create = jest.fn().mockReturnValue({ get: mockedGet });

    await throttledGetDataFromApi(MOCKED_RELATIVE_PATH);

    expect(mockedGet).toHaveBeenCalledWith(MOCKED_RELATIVE_PATH);
  });

  test('should return response data', async () => {
    const mockedGet = jest
      .fn()
      .mockResolvedValue({ data: MOCKED_RESPONSE_DATA });

    axios.create = jest.fn().mockReturnValue({ get: mockedGet });

    const result = await throttledGetDataFromApi(MOCKED_RELATIVE_PATH);

    expect(result).toEqual(MOCKED_RESPONSE_DATA);
  });
});
