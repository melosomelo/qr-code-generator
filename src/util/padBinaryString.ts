export default function padBinaryString(str: string, amount: number): string {
  let padding = "";
  for (let i = 0; i < amount - str.length; i++) {
    padding += "0";
  }
  return `${padding}${str}`;
}
