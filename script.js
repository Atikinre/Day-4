var roots = [];
function regulaFalsi(
  f = function(x, a = 1) {
    return x * x - 9;
  },
  a,
  b,
  dx = 10e-9
) {
  let fa = f(a),
      fb = f(b);
  console.log(fa, fb);
  for (let i = xmin; i < xmax; i += Math.abs(xmax - xmin)) {
    root = (fa * b - fb * a) / (fa - fb);
    if (Math.abs(f(b)) < dx || Math.abs(f(b)) < dx) {
      roots.push("no");
      break;
    }
    fr = f(root);
    if (fr * fb > 0) {
      
      b = root;
      fb = fr;
      if (side == -1) fa /= 2;
      side = -1;
    } else if (fa * fr > 0) {
      
      a = root;
      fa = fr;
      if (side == +1) fb /= 2;
      side = +1;
    } else {
      roots.push(root);
      break;
    }
  }
}
var xmin = -5,
  xmax = 5;
regulaFalsi(
    function(x, a = 1) {
      return x*x*x - 27;
    },
    xmin,
    xmax,
    10e-9
  );
console.log(roots);
