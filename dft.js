const TAU = 2*Math.PI;

class Complex {
  constructor(re = 0 , im = 0) {
    this.re = re;
    this.im = im;
  }

  ampl() {
    return Math.sqrt(this.re*this.re + this.im*this.im);
  }

  offset() {
    return Math.atan2(this.im, this.re);
  }

  static mult(a, b) {
    const re = a.re * b.re - a.im * b.im;
    const im = a.re * b.im + a.im * b.re;
    return new Complex(re, im);
  }

  //b to rzeczywista
  static div(a, b) {
    const re = a.re / b;
    const im = a.im / b;
    return new Complex(re, im);
  }

  static add(a, b) {
    const re = a.re + b.re;
    const im = a.im + b.im;
    return new Complex(re, im);
  }
}

function dft(x) {
  let X = [];
  const N = x.length;
  for(let k = 0; k < N; k++) {
    let result = new Complex();
    for(let n = 0; n < N; n++) {
      const phi = (TAU*k*n)/N
      let calculation = new Complex(Math.cos(phi), -1 * Math.sin(phi));
      calculation = Complex.mult(x[n], calculation);
      result = Complex.add(result, calculation);
    }
    result = Complex.div(result, N);
    X.push(result);
  }
  return X;
}
