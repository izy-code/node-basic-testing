import path from 'node:path';
import fs from 'node:fs';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

const DELAY_MS = 1000;

const callback = jest.fn();

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, DELAY_MS);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(callback, DELAY_MS);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, DELAY_MS);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(DELAY_MS);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, DELAY_MS);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(callback, DELAY_MS);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const INTERVAL_COUNT = 5;

    doStuffByInterval(callback, DELAY_MS);

    expect(callback).not.toHaveBeenCalled();

    for (let i = 0; i < INTERVAL_COUNT; i++) {
      jest.advanceTimersByTime(DELAY_MS);

      expect(callback).toHaveBeenCalledTimes(i + 1);
    }
  });
});

describe('readFileAsynchronously', () => {
  const PATH_TO_FILE = 'path/to/file.md';

  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');

    await readFileAsynchronously(PATH_TO_FILE);

    expect(joinSpy).toHaveBeenCalledTimes(1);
    expect(joinSpy).toHaveBeenCalledWith(__dirname, PATH_TO_FILE);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    await expect(readFileAsynchronously(PATH_TO_FILE)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    const FILE_CONTENT = 'file content';

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(FILE_CONTENT);

    await expect(readFileAsynchronously(PATH_TO_FILE)).resolves.toBe(
      FILE_CONTENT,
    );
  });
});
