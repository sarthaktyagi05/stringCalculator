import { add, getCalledCount } from './stringCalculator';

describe('String Calculator – Full Spec', () => {
  beforeEach(() => {
    global.callCount = 0;
  });

  test('returns 0 for empty string', () => {
    expect(add('')).toBe(0);
  });

  test('returns correct result for a single number', () => {
    expect(add('7')).toBe(7);
  });

  test('adds two comma-separated numbers', () => {
    expect(add('1,2')).toBe(3);
  });

  test('adds unknown amount of numbers', () => {
    expect(add('1,2,3,4,5')).toBe(15);
  });

  test('supports newline delimiters', () => {
    expect(add('1\n2,3')).toBe(6);
  });

  test('throws error for one negative number', () => {
    expect(() => add('1,-2')).toThrow('Negatives not allowed: -2');
  });

  test('throws error with all negative numbers listed', () => {
    expect(() => add('1,-2,-3')).toThrow('Negatives not allowed: -2, -3');
  });

  test('ignores numbers greater than 1000', () => {
    expect(add('2,1001,3')).toBe(5);
  });

  test('supports custom single-character delimiter', () => {
    expect(add('//;\n1;2')).toBe(3);
  });

  test('supports multiple custom delimiters [*][%]', () => {
    expect(add('//[*][%]\n1*2%3')).toBe(6);
  });

  test('supports multi-character delimiters like [***]', () => {
    expect(add('//[***]\n1***2***3')).toBe(6);
  });

  test('supports multiple long delimiters [**][%%]', () => {
    expect(add('//[**][%%]\n1**2%%3')).toBe(6);
  });

  test('handles quoted numbers correctly', () => {
    expect(add('"1"')).toBe(1);
    expect(add('"2","3"')).toBe(5);
    expect(add('1,"2","3"')).toBe(6);
  });

  test('combines mixed quoted + custom delimiter input', () => {
    expect(add('"//;\n1;2","5"')).toBe(8); 
  });

  test('handles string with multiple \n and quoted values', () => {
    expect(add('"//;\n1;2","3\n4"')).toBe(10); 
  });

  test('getCalledCount returns total calls to add()', () => {
    const before = getCalledCount();
    add('1,2');
    add('3,4');
    expect(getCalledCount()).toBe(before + 2);
  });

  test('ignores invalid tokens like empty strings or non-numbers', () => {
    expect(add('1,,2,abc,"3"')).toBe(6); 
  });
});
