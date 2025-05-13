let canvas1 = document.getElementById('canva1');
let ctx1 = canvas1.getContext('2d');

// EX AULA
let kOKUJOUDAI = {
  x: 150,
  y: 150,
  width: 100,
  height: 120,
  img: new Image(),
  desenha: function() {
    ctx1.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}


kOKUJOUDAI.img.src = "IMAGEM/kOKUJOUDAI.png";
kOKUJOUDAI.img.onload = function() {
  animacao(); 
};

function animacao() {
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  kOKUJOUDAI.desenha(); 
  requestAnimationFrame(animacao);
}

document.addEventListener("mousemove", function(evento) {
  let rect = canvas1.getBoundingClientRect();
  let x_mouse = evento.clientX - rect.left;
  let y_mouse = evento.clientY - rect.top;

  let novo_x = x_mouse - kOKUJOUDAI.width/2;
  let novo_y = y_mouse - kOKUJOUDAI.height/2;
  

  kOKUJOUDAI.x = Math.max(0, Math.min(canvas1.width - kOKUJOUDAI.width, novo_x));
  kOKUJOUDAI.y = Math.max(0, Math.min(canvas1.height - kOKUJOUDAI.height, novo_y));
});