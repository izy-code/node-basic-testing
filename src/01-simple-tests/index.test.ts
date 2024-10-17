import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Add })).toBe(5);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 7, action: Action.Subtract })).toBe(-2);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 4, action: Action.Multiply })).toBe(12);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 3, action: Action.Divide })).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toBe(
      8,
    );
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({ a: 2, b: 3, action: 'invalid action' }),
    ).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: 2, b: 'invalid arg', action: Action.Divide }),
    ).toBeNull();

    expect(
      simpleCalculator({ a: 'invalid arg', b: 2, action: Action.Divide }),
    ).toBeNull();
  });
});
