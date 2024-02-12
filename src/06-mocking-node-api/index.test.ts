// Uncomment the code below and write your tests
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from './index';
import fs from 'fs'

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mock = jest.fn()
    doStuffByTimeout(mock, 100)
  });

  test('should call callback only after timeout', () => {
    const mock = jest.fn()
    doStuffByTimeout(mock, 100)
    setTimeout(() => { expect(mock).toHaveBeenCalled() }, 600)
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mock = jest.fn()
    doStuffByInterval(mock, 500)
  });

  test('should call callback multiple times after multiple intervals', () => {
    let counter: number = 0
    const mock = jest.fn(() => { counter++ })
    doStuffByInterval(mock, 500)
    if (counter === 3)
      expect(mock).toHaveBeenCalledTimes(4)
  });
});

describe('readFileAsynchronously', () => {
  jest.mock('fs', () => ({    
    readFile: jest.fn().mockImplementation((path, callback) => {
      callback(null, 'my file content');
      path           
    }),
  }));


  test('should call join with pathToFile', async () => {
    // Write your test here
  });

  test('should return null if file does not exist', async () => {
    const mock = jest.fn(()=> false)
    fs.existsSync = mock
    fs.existsSync('path')    
    const result = await readFileAsynchronously('nonexistent.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {   
     
  });
});
