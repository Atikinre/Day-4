var roots = new Set;
function regulaFalsi(f = function(x,a = 1){return  x*x - 2*x + 4}, xmin = -5, xmax = 5, dx = 10E-9){
    if (Math.abs(f(xmin) * f(xmax)) > dx) { 
      return false;
    }
    let c = (xmin + xmax)/2;    
    for (let i=0; i < 1000; i++) { 
        c = (xmin*f(xmax) - xmax*f(xmin))/ (f(xmax) - f(xmin)); 
        if (f(c)*f(xmin) < 0) 
            xmax = c; 
        else if (f(c)*f(xmax) < 0) 
            xmin = c; 
        else break;
    } 
    roots.add(c);
    return true;
}
var xmin = -3, xmax = 3;
for(var i = xmin; i <= xmax; i += 0.1){
  regulaFalsi(function(x,a = 1){return  x*x - 4}, i, i + 1/Math.abs(Math.abs(xmax) - Math.abs(xmin)), 10e-9);
}
console.log(roots);
