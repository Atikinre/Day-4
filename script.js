var graph = document.getElementById("canvas");
var ctx = graph.getContext("2d");
class Graphics1d {
  constructor(
    xmin = -1.0,
    xmax = 1.0,
    ymin = -1.0,
    ymax = 1.0,
    W = 512,
    H = 512,
    f = function(x) {
      return x * x - 9;
    }
  ) {
    this.xmin = xmin;
    this.xmax = xmax;
    this.ymin = ymin;
    this.ymax = ymax;
    this.W = W;
    this.H = H;
    this.f = f;
    this.ev = 0;
  }
  evaluate() {
    let count = 0;
    this.mxe = [this.f(this.xmin), this.f(this.xmax)];
    this.fvalues = new Float64Array(Math.max(this.H, this.W));
    this.dots = new Array(Math.max(this.W, this.H));
    for (
      let i = this.xmin;
      i <= this.xmax;
      i += (-this.xmin + this.xmax) / this.W  
    ) {
      this.dots[count] = i;
      this.fvalues[count++] = this.f(i);
      this.mxe[1] = Math.max(this.fvalues[count - 1], this.mxe[1]);
      this.mxe[0] = Math.min(this.fvalues[count - 1], this.mxe[0]);
    }
    this.der = new Float64Array(Math.max(this.W, this.H));
    for(let i = 0; i < count; i++){
      if(i == 0)
        this.der[i] = (this.fvalues[i + 1] - this.fvalues[i]) / (this.dots[i+1] - this.dots[i])
      else if(i == count  - 1)
        this.der[i] = (this.fvalues[i] - this.fvalues[i-1]) / (this.dots[i] - this.dots[i-1])
      else
        this.der[i] = (this.fvalues[i+1] - this.fvalues[i-1]) / (this.dots[i+1] - this.dots[i-1])
    }
    this.ev = 1;
    return this.mxe;
  }
  async drawrf(x = [0,1], y = [0, 1]){
    this.drawbg();
    let stepx = this.W / (-this.xmin + this.xmax),
      stepy = this.H / (-this.ymin + this.ymax),
      zerox = -this.xmin * stepx,
      zeroy = this.ymax * stepy;
  for(let i = 0; i < x.length; i += 2){
    await new Promise(resolve => setTimeout(resolve, 100));
    this.drawbg();
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(zerox + x[i] * stepx, zeroy - y[i] * stepy);
    ctx.lineTo(zerox + x[i + 1] * stepx, zeroy + y[i + 1] * stepy);
    ctx.stroke();
    ctx.closePath();
  }
  regx = [];
  regy = []; 
}
  drawbg(bg = "grey", axis = "green"){
     let stepx = this.W / (-this.xmin + this.xmax),
      stepy = this.H / (-this.ymin + this.ymax),
      zerox = -this.xmin * stepx,
      zeroy = this.ymax * stepy;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, ng.W, ng.H);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = axis;
    ctx.moveTo(0, zeroy);
    ctx.lineTo(this.W, zeroy);
    ctx.moveTo(zerox, 0);
    ctx.lineTo(zerox, this.H);
    ctx.closePath();
    ctx.stroke();
    ctx.lineWidth = 0.2;
    ctx.strokeStyle = axis;
    for (let i = zerox; i < this.W; i += sqx * stepx) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, this.H);
      ctx.closePath();
      ctx.stroke();
    }
    for (let j = zeroy; j < this.H; j += sqy * stepy) {
      ctx.beginPath();
      ctx.lineTo(0, j);
      ctx.lineTo(this.W, j);
      ctx.closePath();
      ctx.stroke();
    }
    for (let i = zerox; i > 0; i -= sqx * stepx) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, this.H);
      ctx.closePath();
      ctx.stroke();
    }
    for (let j = zeroy; j > 0; j -= sqy * stepy) {
      ctx.beginPath();
      ctx.lineTo(0, j);
      ctx.lineTo(this.W, j);
      ctx.closePath();
      ctx.stroke();
    }
    }
  draw(
    dots = "red",
    axis = "green",
    zeros = "indigo",
    gaps = "magenta",
    bg = "gray"
  ) {
    graph.width = this.W;
    graph.height = this.H;
    var drawed = new Graphics1d();
    if (this.ev == 0) this.evaluate();
    let stepx = this.W / (-this.xmin + this.xmax),
      stepy = this.H / (-this.ymin + this.ymax),
      zerox = -this.xmin * stepx,
      zeroy = this.ymax * stepy;
    this.drawbg(bg,axis);
    // Функция
    {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = dots;
    ctx.moveTo(zerox + this.xmin * stepx, zeroy - this.f(this.xmin) * stepy);
    for (let i = 0; i < Math.max(this.H * this.W); i++) {
      if (this.dots[i] != this.xmin) {
        let cur = this.fvalues[i];
        let prev = this.fvalues[i - 1];
        if (cur * prev <= 0) {
          if (Math.abs(cur - prev) > this.ymax - this.ymin) {
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = gaps;
            ctx.arc(
              zerox + this.dots[i] * stepx,
              zeroy - stepy * this.ymax,
              stepx / 10,
              0,
              180
            );
            ctx.arc(
              zerox + this.dots[i] * stepx,
              zeroy - stepy * this.ymin,
              stepx / 10,
              0,
              180
            );
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
          } else {
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = zeros;
            ctx.arc(zerox + this.dots[i] * stepx, zeroy, stepx / 10, 0, 180);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.moveTo(
              zerox + this.dots[i - 1] * stepx,
              zeroy - this.fvalues[i - 1] * stepy
            );
            ctx.lineTo(
              zerox + this.dots[i] * stepx,
              zeroy - this.fvalues[i] * stepy
            );
          }
        } else
          
          ctx.lineTo(
            zerox + this.dots[i] * stepx,
            zeroy - this.fvalues[i] * stepy
          );
      }
    }
    ctx.stroke();
    ctx.closePath();
    }
    //
    // Производная
    {
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.moveTo(zerox + this.xmin * stepx, zeroy - this.der[0] * stepy);
    for (let i = 0; i < Math.max(this.H * this.W); i++) {
      if (this.dots[i] != this.xmin) {
        let cur = this.der[i];
        let prev = this.der[i - 1];
        if (cur * prev <= 0) {
          if (Math.abs(cur - prev) > this.ymax - this.ymin) {
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = gaps;
            ctx.arc(
              zerox + this.dots[i] * stepx,
              zeroy - stepy * this.ymax,
              stepx / 10,
              0,
              180
            );
            ctx.arc(
              zerox + this.dots[i] * stepx,
              zeroy - stepy * this.ymin,
              stepx / 10,
              0,
              180
            );
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
          } else {
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = zeros;
            ctx.arc(zerox + this.dots[i] * stepx, zeroy, stepx / 10, 0, 180);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.moveTo(
              zerox + this.dots[i - 1] * stepx,
              zeroy - this.der[i - 1] * stepy
            );
            ctx.lineTo(
              zerox + this.dots[i] * stepx,
              zeroy - this.der[i] * stepy
            );
          }
        } else
          
          ctx.lineTo(
            zerox + this.dots[i] * stepx,
            zeroy - this.der[i] * stepy
          );
      }
      
    }
    ctx.stroke();
    ctx.closePath();
    }
    //
    //Текст
    {
    ctx.font = "25px Consolas";
    ctx.textBaseline = "ideographic";
    ctx.fillStyle = "black";
    let mx = "(" + this.xmax + ", " + this.ymax + ")",
      mn = "(" + this.xmin + ", " + this.ymin + ")";
    ctx.fillText(
      mx,
      zerox + this.xmax * stepx - (25 * mx.length) / 1.8,
      zeroy - this.ymax * stepy + 25
    );
    ctx.fillText(mn, zerox + this.xmin * stepx, zeroy - this.ymin * stepy);
    }
    //
  }

  autodraw(
    dots = "red",
    axis = "green",
    zeros = "indigo",
    gaps = "magenta",
    bg = "gray"
  ) {

    if (this.ev == 0) var mx = this.evaluate();
    this.ymin = Math.min(mx[0], mx[1]);
    this.ymax = Math.max(mx[0], mx[1]);
    this.draw(dots, axis, zeros, gaps, bg);
    
  }
}
function replaceSpecialSequence(str) {
  str = str.split("cos").join("Math.cos");
  str = str.split("sin").join("Math.sin");
  str = str.split("tan").join("Math.tan");
  str = str.split("aMath.cos").join("Math.acos");
  str = str.split("aMath.sin").join("Math.asin");
  str = str.split("aMath.tan").join("Math.atan");
  str = str.split("pi").join("Math.PI");
  str = str.split("ln2").join("Math.LN2");
  str = str.split("ln10").join("Math.LN10");
  str = str.split("log2e").join("Math.LOG2E");
  str = str.split("log10e").join("Math.LOG10E");
  str = str.split("sqrt1_2").join("Math.SQRT1_2");
  str = str.split("sqrt2").join("Math.SQRT2");
  str = str.split("abs").join("Math.abs");
  str = str.split("ceil").join("Math.ceil");
  str = str.split("exp").join("Math.exp");
  str = str.split("floor").join("Math.floor");
  str = str.split("ln").join("Math.log");
  str = str.split("max").join("Math.max");
  str = str.split("min").join("Math.min");
  str = str.split("pow").join("Math.pow");
  str = str.split("round").join("Math.round");
  str = str.split("lg").join("logab");
  str = str.split("sqrt").join("Math.sqrt");
  str = str.split("e").join("Math.E");
  return str;
}
var sqx = 0.5,
  sqy = 0.5;
var ng = new Graphics1d();
var roots = [];
var mins = new Set;
var maxs = new Set;
var regx = [], regy = [];
function check(f = function(x){return  2*x}, y, step){
  if (f(y - step) <= 0 && f(y + step) >= 0){
    mins.add(y);
  }
  else if(f(y - step) >= 0 && f(y + step) <= 0){
    maxs.add(y);
  }
  
}

for(var i = ng.xmin; i <= ng.xmax; i += (-ng.xmin + ng.xmax) / ng.W){
    regulaFalsi(function(x){return  2*x}, i, i + 0.1, 10e-9);
  }
for(let i = 0; i < roots.length; i++)
    check(function(x){return  2*x}, roots[i], (-ng.xmin + ng.xmax) / ng.W);
document.getElementById("mins").innerHTML = Array.from(mins).join(", ");
document.getElementById("maxs").innerHTML = Array.from(maxs).join(", ");
function regulaFalsi(f = function(x){return  2*x - 2*x}, xmin = -5, xmax = 5, dx = 10E-9){
    
    if (f(xmin) * f(xmax) > 0 || Math.abs(f(xmax) - f(xmin)) < dx) { 
      return false;
    }
    let c = (xmin + xmax)/2;
    for (let i=0; i < 1000; i++) {
        regx.push(xmin);
        regx.push(xmax);
        regy.push(f(xmin));
        regy.push(f(xmax));
        c = (xmin*f(xmax) - xmax*f(xmin))/ (f(xmax) - f(xmin)); 
        if (f(c)*f(xmin) < 0) 
            xmax = c; 
        else if (f(c)*f(xmax) < 0) 
            xmin = c; 
        else {
            roots.push(Math.trunc(c / dx) * dx);
          break;
        }
    } 
    return true;
}
function yes() {
  var xmin = parseFloat(document.getElementById("xmin").value),
    xmax = parseFloat(document.getElementById("xmax").value),
    ymin = parseFloat(document.getElementById("ymin").value),
    ymax = parseFloat(document.getElementById("ymax").value),
    W = parseFloat(document.getElementById("W").value),
    H = parseFloat(document.getElementById("H").value),
    f = document.getElementById("f").value;
  sqx = parseFloat(document.getElementById("sqx").value);
  sqy = parseFloat(document.getElementById("sqy").value);
  f = replaceSpecialSequence(f);
  var m = function(x) {
    return eval(f);
  };
  var d = function(x){
    return (ng.f(x + (-ng.xmin + ng.xmax) / ng.W) - ng.f(x - (-ng.xmin + ng.xmax) / ng.W))/(((-ng.xmin + ng.xmax) / ng.W +(-ng.xmin + ng.xmax) / ng.W));
  }
  ng = new Graphics1d(xmin, xmax, ymin, ymax, W, H, m);
  roots = [];
  mins.clear();
  maxs.clear();
  ng.drawbg();
  ;
  for(var i = xmin; i <= xmax; i += (-ng.xmin + ng.xmax) / ng.W){
    regulaFalsi(d, i, i + 0.1, 10e-9);
  }
  ng.drawrf(regx, regy);
  for(let i = 0; i < roots.length; i++)
    check(d, roots[i], (-ng.xmin + ng.xmax) / ng.W);
  document.getElementById("mins").innerHTML = Array.from(mins).join(", ");
  document.getElementById("maxs").innerHTML = Array.from(maxs).join(", ");
  
}
ng.drawrf(regx, regy);