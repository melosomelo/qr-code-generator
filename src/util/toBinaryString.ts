export default function toBinaryString(n: number): string {
  if (n === 1 || n === 0) return `${n}`;
  return `${toBinaryString(Math.floor(n / 2))}${n % 2}`;
}
