export default class Polynomial {
  public readonly deg: number;
  public readonly coefficients: number[];
  constructor(deg: number, coefficients?: number[]) {
    this.deg = deg;
    this.coefficients = coefficients ?? new Array(deg + 1).fill(0);
  }

  public getLeadingCoefficient(): number {
    return this.coefficients[0];
  }

  static add(f: Polynomial, g: Polynomial): Polynomial {
    const [min, max] = [g, f].sort((a, b) => a.deg - b.deg);
    const coefficients: number[] = new Array(max.deg).fill(0);
    const diff = max.deg - min.deg;
    for (let i = 0; i < diff; i++) {
      coefficients[i] = max.coefficients[i];
    }
    for (let i = diff; i <= max.deg; i++) {
      coefficients[i] = max.coefficients[i] + min.coefficients[i - diff];
    }
    const firstNonZeroCoefficient = coefficients.findIndex((el) => el !== 0);
    const finalCoefficients = coefficients.slice(firstNonZeroCoefficient);
    return new Polynomial(finalCoefficients.length - 1, finalCoefficients);
  }
}
