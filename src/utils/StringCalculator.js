let callCount = 0;

export const getCalledCount = () => callCount;

export const add = (input) => {
  callCount++;

  if (!input) return 0;

  let delimiters = [',', '\n'];
  let numbersString = input;

  // Handling custom delimiter
  const customDelimMatch = input.match(/^\/\/(\[.*\])+\n/);
  if (customDelimMatch) {
    const raw = customDelimMatch[0];
    numbersString = input.slice(raw.length);
    const allMatches = [...raw.matchAll(/\[([^\]]+)\]/g)];
    delimiters = allMatches.map((match) => match[1]);
  } else if (input.startsWith('//')) {
    delimiters = [input[2]];
    numbersString = input.slice(4); // remove "//;\n"
  }

  // Building regex to split on all delimiters
  const splitRegex = new RegExp(delimiters.map(d => escapeRegExp(d)).join('|'));

  const numbers = numbersString
  .split(splitRegex)
  .map(n => Number(n.replace(/["']/g, '').trim()));


  const negatives = numbers.filter(n => n < 0);
  if (negatives.length) {
    throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
  }

  return numbers.filter(n => n <= 1000).reduce((sum, n) => sum + (isNaN(n) ? 0 : n), 0);
};

function escapeRegExp(str) {
  return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}
