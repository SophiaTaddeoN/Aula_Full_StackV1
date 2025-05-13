let r = Math.random() * 100;
let i = Math.floor(r);
console.log("Número sorteado:", i);

let nmaior = [];
let nmenor = [];

function comparacao() {
  let nusuario = parseInt(document.getElementById("box1").value);

  if (nusuario > 99 || nusuario < 0) {
    document.getElementById("resposta").innerHTML = "Digite um número válido";
    document.getElementById("resposta").style.backgroundColor = "red";
    return;
  }

  if (nusuario < i) {
    document.getElementById("resposta").innerHTML = " Número menor! ";
    document.getElementById("resposta").style.backgroundColor = "red";
    nmenor.push(nusuario);
  } else if (nusuario > i) {
    document.getElementById("resposta").innerHTML = " Número maior! ";
    document.getElementById("resposta").style.backgroundColor = "red";
    nmaior.push(nusuario);
  } else {
    document.getElementById("resposta").innerHTML = " Número correto! ";
    document.getElementById("resposta").style.backgroundColor = "green";
  }

  atualizarListas();
}

function atualizarListas() {
  document.getElementById("menores").innerHTML = nmenor.join(", ");

  document.getElementById("maiores").innerHTML = nmaior.join(", ");
}
