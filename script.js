var roots = [];
function regulaFalsi(f = function(x,a = 1){return  x*x - 2*x + 4}, xmin = -5, xmax = 5, dx = 10E-9){
    if (f(xmin) * f(xmax) > 0) { 
      console.log("нет");
      return false;
    } 
    let c = xmin;    
    for (let i=0; i < 1000; i++) { 
        c = (xmin*f(xmax) - xmax*f(xmin))/ (f(xmax) - f(xmin)); 
        console.log(c, f(c));
        if (Math.abs(f(c)) <= dx) 
            break; 
        else if (f(c)*f(xmin) < 0) 
            xmax = c; 
        else
            xmin = c; 
    } 
    console.log(c);
    return true;
}
var xmin = -5, xmax = 5;
regulaFalsi(function(x,a = 1){return  x*x - 4}, xmin, xmax, 10e-9);
