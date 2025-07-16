import { add, getCalledCount } from './stringCalculator';

describe('String Calculator', () => {
  beforeEach(() => {
    global.callCount = 0;
  });

  test('returns 0 for empty string', () => {
    expect(add('')).toBe(0);
  });

  test('returns number for single value', () => {
    expect(add('5')).toBe(5);
  });

  test('adds two comma-separated numbers', () => {
    expect(add('1,2')).toBe(3);
  });

  test('adds multiple comma-separated numbers', () => {
    expect(add('1,2,3,4')).toBe(10);
  });

  test('handles newline as delimiter', () => {
    expect(add('1\n2,3')).toBe(6);
  });

  test('throws error on negative number', () => {
    expect(() => add('1,-2')).toThrow('Negatives not allowed: -2');
  });

  test('throws error listing all negatives', () => {
    expect(() => add('1,-2,3,-4')).toThrow('Negatives not allowed: -2, -4');
  });

  test('ignores numbers greater than 1000', () => {
    expect(add('2,1001,3')).toBe(5);
  });

  test('supports custom delimiter like ";"', () => {
    expect(add('//;\n1;2')).toBe(3);
  });

  test('supports multi-character delimiter like "***"', () => {
    expect(add('//[***]\n1***2***3')).toBe(6);
  });

  test('supports multiple single-character delimiters', () => {
    expect(add('//[*][%]\n1*2%3')).toBe(6);
  });

  test('supports multiple multi-character delimiters', () => {
    expect(add('//[**][%%]\n1**2%%3')).toBe(6);
  });

  test('supports inputs with quotes (e.g., "1")', () => {
    expect(add('1,2\n3,4,"1"')).toBe(11);
  });

  test('ignores non-numeric inputs', () => {
    expect(add('1,abc,2')).toBe(3);
  });

  test('getCalledCount returns correct number of calls', () => {
    const countBefore = getCalledCount();
    add('1,2');
    add('3,4');
    expect(getCalledCount()).toBe(countBefore + 2);
  });
});
