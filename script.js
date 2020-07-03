var roots = [];
function regulaFalsi(
  f = function(x, a = 1) {
    return x * x - 9;
  },
  a,
  b,
  dx = 10e-9
) {
  let root,
    fr,
    i,
    side = 0,
    fa = f(a),
    fb = f(b);
  for (i = 0; i < 1000; i++) {
    root = (fa * b - fb * a) / (fa - fb);
    if (Math.abs(f(b)) < dx || Math.abs(f(b)) < dx) {
      roots.push("no");
      break;
    }
    fr = f(root);
    if (fr * fb > 0) {
      console.log("fr * fb > 0", fa, fb, root);
      b = root;
      fb = fr;
      if (side == -1) fa /= 2;
      side = -1;
    } else if (fa * fr > 0) {
      console.log("fr * fa > 0", fa, fb, fr);
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
for (let i = xmin; i <= xmax; i += 1 / Math.abs(xmax - xmin)) {
  regulaFalsi(
    function(x, a = 1) {
      return x * x - 2 * x + 4;
    },
    i,
    xmax,
    10e-9
  );
}
console.log(roots);
