let callCount = 0;
export const getCalledCount = () => callCount;

export const add = (input) => {
  callCount++;

  if (!input) return 0;

  const quotedInputs = splitQuotedInputs(input);
  if (quotedInputs.length > 1) {
    return quotedInputs.reduce((sum, part) => sum + add(part), 0);
  }

  let delimiters = [',', '\n'];
  let numbersString = input;

  const customDelimMatch = input.match(/^\/\/(\[.*\])+\n/);
  if (customDelimMatch) {
    const raw = customDelimMatch[0];
    numbersString = input.slice(raw.length);
    const allMatches = [...raw.matchAll(/\[([^\]]+)\]/g)];
    delimiters = allMatches.map((match) => match[1]);
  } else if (input.startsWith('//')) {
    delimiters = [input[2]];
    numbersString = input.slice(4);
  }

  const splitRegex = new RegExp(delimiters.map((d) => escapeRegExp(d)).join('|'));
  const numbers = numbersString
    .split(splitRegex)
    .map((n) => Number(n.replace(/["']/g, '').trim()));

  const negatives = numbers.filter((n) => n < 0);
  if (negatives.length) {
    throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
  }

  return numbers.filter((n) => n <= 1000).reduce((sum, n) => sum + (isNaN(n) ? 0 : n), 0);
};

function escapeRegExp(str) {
  return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function splitQuotedInputs(input) {
  const regex = /"([^"]*)"/g;
  const result = [];
  let lastIndex = 0;

  let match;
  while ((match = regex.exec(input)) !== null) {
    if (match.index > lastIndex) {
      const nonQuotedPart = input.slice(lastIndex, match.index).trim().replace(/,$/, '');
      if (nonQuotedPart) result.push(nonQuotedPart);
    }
    result.push(match[1]); 
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < input.length) {
    const remaining = input.slice(lastIndex).trim().replace(/^,/, '');
    if (remaining) result.push(remaining);
  }

  return result.length > 1 ? result : [input];
}

