var roots = [];
function regulaFalsi(f = function(x,a = 1){return  x*x - 2*x + 4}, a, b, dx = 10E-9){
    if (f(xmin) * f(xmax) >= 0) { 
        ret
    } 
    let c = xmin;    
    for (let i=0; i < 1000; i++) { 
        c = (xmin*f(xmax) - xmax*f(xmin))/ (f(xmax) - f(xmin)); 
        if (f(c)==0) 
            break; 
        else if (f(c)*f(xmin) < 0) 
            xmax = c; 
        else
            xmin = c; 
    } 
    roots.push(c);
}
for(let i = xmin; i < xmax; i += )
console.log(regulaFalsi());
