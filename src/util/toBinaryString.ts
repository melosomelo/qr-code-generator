import padBinaryString from "./padBinaryString";

function convertToBinary(n: number): string {
  if (n === 1 || n === 0) return `${n}`;
  return `${toBinaryString(Math.floor(n / 2))}${n % 2}`;
}

export default function toBinaryString(n: number, digits?: number): string {
  const result = convertToBinary(n);
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!digits || digits === result.length) return result;

  return padBinaryString(result, digits);
}
