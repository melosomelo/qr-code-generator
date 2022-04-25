import GF256 from "./gf256";

// A polynomial whose operations are defined by those of GF(256)
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

  private static clone(f: Polynomial): Polynomial {
    return new Polynomial(f.deg, [...f.coefficients]);
  }

  static add(f: Polynomial, g: Polynomial): Polynomial {
    const [min, max] = [g, f].sort((a, b) => a.deg - b.deg);
    const coefficients: number[] = new Array(max.deg).fill(0);
    const diff = max.deg - min.deg;
    for (let i = 0; i < diff; i++) {
      coefficients[i] = max.coefficients[i];
    }
    for (let i = diff; i <= max.deg; i++) {
      coefficients[i] = GF256.add(
        max.coefficients[i],
        min.coefficients[i - diff]
      );
    }
    const firstNonZeroCoefficient = coefficients.findIndex((el) => el !== 0);
    const finalCoefficients = coefficients.slice(firstNonZeroCoefficient);
    return new Polynomial(finalCoefficients.length - 1, finalCoefficients);
  }

  // addition and subtraction in GF(256) are equal
  static subtract(f: Polynomial, g: Polynomial): Polynomial {
    return this.add(f, g);
  }

  static multiply(f: Polynomial, g: Polynomial): Polynomial {
    const coefficients: number[] = new Array(f.deg + g.deg + 1).fill(0);
    for (let i = 0; i <= f.deg; i++) {
      if (f.coefficients[i] === 0) continue;
      for (let j = 0; j <= g.deg; j++) {
        coefficients[i + j] = GF256.add(
          coefficients[i + j],
          GF256.multiply(f.coefficients[i], g.coefficients[j])
        );
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
    const divisor = this.clone(g);
    let dividend = this.clone(f);
    if (divisor.deg === 0 && divisor.coefficients[0] === 0) {
      throw new Error("Cannot divide by 0!");
    }
    let quotient = new Polynomial(0);
    const lg = divisor.coefficients[0];
    while (dividend.deg >= divisor.deg) {
      const lf = dividend.coefficients[0];
      const temp = new Polynomial(dividend.deg - divisor.deg, [
        GF256.divide(lf, lg),
        ...new Array(Math.max(0, dividend.deg - divisor.deg)).fill(0),
      ]);
      dividend = Polynomial.subtract(
        dividend,
        Polynomial.multiply(divisor, temp)
      );
      quotient = Polynomial.add(quotient, temp);
    }
    return { quotient, remainder: dividend };
  }
}
