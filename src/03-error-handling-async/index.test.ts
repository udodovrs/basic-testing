// Uncomment the code below and write your tests
import { throwError, resolveValue, throwCustomError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const arg = 1
    const value = await resolveValue(arg)
    expect(value).toBe(arg)
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    try {
      throwError('Test Error')
    } catch (e: any) {      
      expect(e.message).toBe('Test Error');
    }
  });

  test('should throw error with default message if message is not provided', () => {
    try {
      throwError()
    } catch (e: any) {      
      expect(e.message).toBe('Oops!');
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    try {
      throwCustomError()
    } catch (e: any) {      
      expect(e.message).toBe('This is my awesome custom error!');
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {    
    await expect(rejectCustomError()).rejects.toThrow('This is my awesome custom error!')
  });
});
