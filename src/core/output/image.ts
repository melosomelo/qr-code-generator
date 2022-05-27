import * as sharp from "sharp";

export default async function toImage(matrix: string[][]): Promise<void> {
  const input = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (matrix[i][j] === "1") {
        input.push(0, 0, 0);
      } else {
        input.push(255, 255, 255);
      }
    }
  }
  const image = sharp(Uint8Array.from(input), {
    raw: {
      width: matrix.length,
      height: matrix.length,
      channels: 3,
    },
  });
  await image.toFile("./qrcode.png");
  await sharp("./qrcode.png").resize(400, 400).toFile("./qrcode-resized.png");
}
