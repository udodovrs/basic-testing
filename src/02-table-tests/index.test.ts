// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 3, b: 2, action: null, expected: null },
  { a: 3, b: null, action: Action.Multiply, expected: null }
];

describe.each(testCases)('Table test for simpleCalculator', ({ a, b, action, expected }) =>
  test(`args: ${a}, ${b}, ${action}`, () => expect(simpleCalculator({ a, b, action })).toBe(expected)))