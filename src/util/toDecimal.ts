export default function toDecimal(b: string): number {
  let result = 0;
  for (let i = 0; i < b.length; i++) {
    result += parseInt(b[b.length - 1 - i], 10) * 2 ** i;
  }
  return result;
}
