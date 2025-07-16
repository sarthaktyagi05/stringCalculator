let callCount = 0;

export function getCalledCount() {
  return callCount;
}

export function add(input) {
  callCount++;

  if (!input || input.trim() === '') return 0;
  const numberPattern = /-?\d+/g; 
  const matches = input.match(numberPattern);

  if (!matches) return 0;

  const numbers = matches.map(Number);

  const negatives = numbers.filter(n => n < 0);
  if (negatives.length > 0) {
    throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
  }

  return numbers.filter(n => n <= 1000).reduce((sum, n) => sum + n, 0);
}




