function convertToBinary(n: number): string {
  if (n === 1 || n === 0) return `${n}`;
  return `${toBinaryString(Math.floor(n / 2))}${n % 2}`;
}

function padBinaryString(str: string, amount: number): string {
  let padding = "";
  for (let i = 0; i < amount - str.length; i++) {
    padding += "0";
  }
  return `${padding}${str}`;
}

export default function toBinaryString(n: number, digits?: number): string {
  const result = convertToBinary(n);
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!digits || digits === result.length) return result;

  return padBinaryString(result, digits);
}
