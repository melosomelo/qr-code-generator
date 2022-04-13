export default class Polynomial {
  public readonly deg: number;
  public readonly coefficients: number[];
  constructor(deg: number, coefficients?: number[]) {
    this.deg = deg;
    this.coefficients = coefficients ?? new Array(deg + 1).fill(0);
    if (this.coefficients.length !== this.deg + 1) {
      throw new Error(
        "Amount of coefficients should be one more that of degree plus one!"
      );
    }
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

  private static invert(f: Polynomial): Polynomial {
    const coefficients = f.coefficients.map((coef) => coef * -1);
    return new Polynomial(f.deg, coefficients);
  }

  static subtract(f: Polynomial, g: Polynomial): Polynomial {
    return this.add(f, this.invert(g));
  }

  static multiply(f: Polynomial, g: Polynomial): Polynomial {
    const coefficients: number[] = new Array(f.deg + g.deg + 1).fill(0);
    for (let i = 0; i <= f.deg; i++) {
      for (let j = 0; j <= g.deg; j++) {
        coefficients[i + j] += f.coefficients[i] * g.coefficients[j];
      }
    }
    const firstNonZeroCoefficient = coefficients.findIndex((el) => el !== 0);
    const finalCoefficients = coefficients.slice(firstNonZeroCoefficient);
    return new Polynomial(finalCoefficients.length - 1, finalCoefficients);
  }

  static longDivide(
    f: Polynomial,
    g: Polynomial
  ): { quotient: Polynomial; remainder: Polynomial } {
    if (g.deg === 0 && g.coefficients[0] === 0) {
      throw new Error("Cannot divide by 0!");
    }
    let quotient = new Polynomial(0);
    const lg = g.coefficients[0];
    while (f.deg >= g.deg) {
      const lf = f.coefficients[0];
      const temp = new Polynomial(f.deg - g.deg, [
        lf / lg,
        ...new Array(Math.max(0, f.deg - g.deg)).fill(0),
      ]);
      f = Polynomial.subtract(f, Polynomial.multiply(g, temp));
      quotient = Polynomial.add(quotient, temp);
    }
    return { quotient, remainder: f };
  }
}
