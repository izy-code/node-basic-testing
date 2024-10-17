import { simpleCalculator, Action } from './index';

const testCases = [
  // Add
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: -2, action: Action.Add, expected: 0 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  // Subtract
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: -2, action: Action.Subtract, expected: 4 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  // Multiply
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: -2, action: Action.Multiply, expected: -4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  // Divide
  { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
  { a: 2, b: -2, action: Action.Divide, expected: -1 },
  { a: 3, b: 2, action: Action.Divide, expected: 1.5 },
  // Exponentiate
  { a: 2, b: -1, action: Action.Exponentiate, expected: 0.5 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 2, b: 0, action: Action.Exponentiate, expected: 1 },
  // Invalid action
  { a: 1, b: 2, action: 'invalid action', expected: null },
  // Invalid arguments
  { a: 'invalid arg', b: 2, action: Action.Add, expected: null },
  { a: 1, b: 'invalid arg', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected when given $a, $b and "$action"',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
