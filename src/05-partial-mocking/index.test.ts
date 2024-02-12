// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule = jest.requireActual<typeof import('./index')>('./index');

  return { 
    __esModule: true,
    ...originalModule,    
    mockOne: () => 'mockOne',
    mockTwo: () => 'mockTwo',
    mockThree: () => 'mockThree',
  } 
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
   expect(mockOne()).toBe('mockOne')
   expect(mockTwo()).toBe('mockTwo')
   expect(mockThree()).toBe('mockThree')    
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction()    
    process.stdout.on('data', (data)=>{
      const message = data.toString()
      expect(message).toBe('I am not mocked')
    })
  });
});
