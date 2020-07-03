
function regulaFalsi(f = function(x,a = 1){return  x*x*x - 27}, xmin = -5, xmax = 5, dx = 10E-9){
    if (f(xmin) * f(xmax) >= 0) { 
        alert("Нет")
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
    return c;
} 
console.log(regulaFalsi());
