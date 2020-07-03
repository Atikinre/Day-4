
function regulaFalsi(f = function(x,a = 1){return  x*x*x - Math.cos(x)}, xmin = -5, xmax = 5, dx = 10E-9){
   let r,fr, m = 10E9;
   let n, side=0;
   /* starting values at endpoints of interval */
   let fs = f(xmin),
   ft = f(xmax),
   roots = [];
   for (n = 0; n < m; n++)
   {
       r = (fs*xmax - ft*xmin) / (fs - ft);
       if (Math.abs(xmax-xmin) < dx*Math.abs(xmax+xmin)) break;
       fr = f(r);

       if (fr * ft > 0)
       {
         /* fr and ft have same sign, copy r to t */
         xmax = r; ft = fr;
         if (side==-1) fs /= 2;
         side = -1;
       }
       else if (fs * fr > 0)
       {
         /* fr and fs have same sign, copy r to s */
         xmin = r;  fs = fr;
         if (side==+1) ft /= 2;
         side = +1;
       }
       else
       {
         /* fr * f_ very small (looks like zero) */
         roots.push([r, n]);
       } 
    }
    return [roots , n];
}
console.log(regulaFalsi());
