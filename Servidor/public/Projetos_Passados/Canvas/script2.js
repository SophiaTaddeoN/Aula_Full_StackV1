let canvas = document.getElementById("canva1");
let ctx = canvas.getContext("2d");

let canvas2 = document.getElementById("canva2");
let ctx2 = canvas2.getContext("2d");

function quadrado(color1, x1, y1, h1, w1) {
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.fillStyle = color1;
  ctx.fillRect(x1, y1, h1, w1);
  ctx.closePath();
}

function circulos(x2, y2, z1, rad1, rad2, color2, str2) {
  ctx.beginPath();
  ctx.arc(x2, y2, z1, rad1, rad2 * Math.PI);
  ctx.fillStyle = color2;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = str2;
  ctx.stroke();
}

function arco(x, y, raio, inicioAngulo, fimAngulo, cor) {
  ctx.strokeStyle = cor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, raio, inicioAngulo, fimAngulo);
  ctx.stroke();
}

function linha(color3, x3, y3, li, lf) {
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = color3;
  ctx.moveTo(x3, y3);
  ctx.lineTo(li, lf);
  ctx.stroke();
}

function text(font, cor, texto, x5, y5) {
  ctx.lineWidth = 1;
  ctx.textAlign = "center";
  ctx.font = font;
  ctx.fillStyle = cor;
  ctx.fillText(texto, x5, y5);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function quadrado2(color1, x1, y1, width1, height1) {
  ctx2.beginPath();
  ctx2.lineWidth = 5;
  ctx2.fillStyle = color1;
  ctx2.fillRect(x1, y1, height1, width1);
  ctx2.closePath();
}

function arco2(x, y, raio, inicioAngulo, fimAngulo, cor, cor2) {
  ctx2.strokeStyle = cor;
  ctx2.fillStyle = cor2;
  ctx2.lineWidth = 2;
  ctx2.beginPath();
  ctx2.arc(x, y, raio, inicioAngulo, fimAngulo);
  ctx2.stroke();
}

function linha2(color3, x3, y3, li, lf) {
  ctx2.beginPath();
  ctx2.lineWidth = 2;
  ctx2.strokeStyle = color3;
  ctx2.moveTo(x3, y3);
  ctx2.lineTo(li, lf);
  ctx2.stroke();
}

function text2(font, cor, texto, x5, y5) {
  ctx2.lineWidth = 1;
  ctx2.textAlign = "center";
  ctx2.font = font;
  ctx2.fillStyle = cor;
  ctx2.fillText(texto, x5, y5);
}

function circulo2(corfill, corstroke, x, y, raio, inicioAngulo, fimAngulo) {
  ctx2.beginPath();
  ctx2.moveTo(x, y);
  ctx2.arc(x, y, raio, inicioAngulo, fimAngulo);
  ctx2.closePath();

  ctx2.fillStyle = corfill;
  ctx2.strokeStyle = corstroke;
  ctx2.lineWidth = 2;

  ctx2.fill();
  ctx2.stroke();
}
function triangulo(cor, corltri, x1, y1, lx1, ly1, lx2, ly2, lx3, ly3) {
  ctx2.fillStyle = cor;
  ctx2.strokeStyle = corltri;
  ctx2.beginPath();
  ctx2.moveTo(x1, y1);
  ctx2.lineTo(lx1, ly1);
  ctx2.lineTo(lx2, ly2);
  ctx2.lineTo(lx3, ly3);
  ctx2.fill();
  ctx2.stroke();
}
////////////////////////////CANVAS 1///////////////////////////////
// quadrados azul e vermelho
quadrado("blue", 0, 0, 45, 45);
quadrado("red", 255, 0, 45, 45);

//quadrados petros
quadrado("black", 270, 270, 30, 30);
quadrado("black", 270, 240, 30, 30);
quadrado("black", 240, 270, 30, 30);

//quadradso amarelos
quadrado("yellow", 0, 270, 30, 30);
quadrado("yellow", 0, 240, 30, 30);
quadrado("yellow", 30, 270, 30, 30);

//quadrados perto da linha
quadrado("red", 110, 149, 40, 40);
quadrado("aqua", 0, 150, 30, 30);
quadrado("aqua", 0, 120, 30, 30);
quadrado("aqua", 270, 135, 30, 30);

//linhas
linha("green", 0, 150, 300, 150);
linha("blue", 0, 0, 150, 150);
linha("red", 300, 0, 150, 150);
linha("black", 150, 150, 150, 270);

//bolas
circulos(150, 115, 15, 0, 2, "aqua", "blue");
circulos(75, 225, 15, 0, 2, "yellow", "green");
circulos(225, 225, 15, 0, 2, "yellow", "green");
circulos(150, 300, 40, 0,2,"aquamarine", "green");

//arcos
arco(150, 150, 60, 1 * Math.PI, 0, "green"); //arco central pela metade
arco(150, 150, 80, 1 * Math.PI, 1.25 * Math.PI, "green"); //primeiro arco até a linha em 45 graus
arco(150, 150, 80, 1.75 * Math.PI, 0, "green"); //segundo arco até a linha em 45 graus
arco(150, 300, 60, 1.5 * Math.PI, 0, "green"); //pequeno arco inferior
arco(150, 300, 80, 1 * Math.PI, 1.5 * Math.PI, "green"); //grande arco inferior
arco(150, 150, 60, 1 * Math.PI, 0, "Green");

//texto
text("25px Arial", "black", "Canvas", 150, 70);

/////////////////////////////// CANVAS 2 //////////////////////////////////////////////



//quadrado
quadrado2("gray", 0, 220, 200, 500);
quadrado2("RoyalBlue", 0, 220, 100, 41);
quadrado2("RoyalBlue", 0, 260, 40, 115);
quadrado2("rgb(125, 63, 25)", 40, 160, 60, 20);
quadrado2("rgb(125, 63, 25)", 240, 190, 60, 20);
quadrado2("rgb(125, 63, 25)", 110, 130, 90, 80);
quadrado2("DodgerBlue", 116, 155, 23, 23);
quadrado2("DodgerBlue", 160, 155, 23, 23);
quadrado2("rgb(89, 40, 19)", 139, 178, 42, 21);

//circulo
circulo2("royalblue", "royalblue", 0, 220, 40, 1.5 * Math.PI, 2 * Math.PI);
circulo2("royalblue", "royalblue", 110, 300, 39, 1.5 * Math.PI, 2 * Math.PI);
circulo2("Green", "green", 50, 150, 25, 0 * Math.PI, 2 * Math.PI);
circulo2("Green", "green", 250, 180, 25, 0 * Math.PI, 2 * Math.PI);
circulo2("yellow", "yellow", 240, 80, 35, 0 * Math.PI, 2 * Math.PI);

//triangulo
triangulo("	#FF4040", "	#FF4040", 110, 130, 150, 90, 190, 130, 110, 130);
