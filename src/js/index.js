const btn_letras = document.querySelectorAll("#letrasButtons button");
const imagen = document.getElementById("imagen");
const palabraAdivinar = document.getElementById("palabraAdivinar");
const generarLetras = document.getElementById("generarLetras");
generarLetras.addEventListener("click", iniciar);

let palabrita;
let cant_errores = 0;
let cant_aciertos = 0;
const arrPalabras = [
  "perro",
  "caballo",
  "cocodrillo",
  "raton",
  "leon",
  "gusano",
  "mariposa"
];

function iniciar(event) {
  imagen.src = "src/assets/ahorcado0.png";
  generarLetras.disabled = true;
  cant_errores = 0;
  cant_aciertos = 0;
  palabraAdivinar.innerHTML = "";

  const cant_palabras = arrPalabras.length;
  const valor_al_azar = obtener_random(0, cant_palabras);
  palabrita = arrPalabras[valor_al_azar];
  console.log(palabrita);
  const cant_letras = palabrita.length;

  for (let i = 0; i < btn_letras.length; i++) {
    btn_letras[i].disabled = false;
  }

  for (let i = 0; i < cant_letras; i++) {
    const span = document.createElement("span");
    palabraAdivinar.appendChild(span);
  }
}
//boton letras
for (let i = 0; i < btn_letras.length; i++) {
  btn_letras[i].addEventListener("click", click_letras);
}

function click_letras(event) {
  const spans = document.querySelectorAll("#palabraAdivinar span");
  const button = event.target;
  button.disabled = true;

  const letra = button.innerHTML.toLowerCase();
  const palabra = palabrita.toLowerCase();

  let acerto = false;
  for (let i = 0; i < palabra.length; i++) {
    if (letra === palabra[i]) {
      //ponemos el resultado en mayus
      spans[i].innerHTML = letra.toUpperCase();
      cant_aciertos++;
      acerto = true;
    }
  }

  if (acerto === false) {
    cant_errores++;
    const source = `src/assets/ahorcado${cant_errores}.png`;
    imagen.src = source;
  }

  if (cant_errores === 6) {
    id("resultado").innerHTML = "Perdiste, la palabra era " + palabrita; //alert("Perdiste, la palabra era " + palabrita); //"Perdiste, la palabra era " + palabrita;
    game_over();
  } else if (cant_aciertos === palabrita.length) {
    id("resultado").innerHTML = "GANASTE!!";
    game_over();
  }
  console.log(
    "la letra " + letra + " en la palabra " + palabra + " ¿existe?: " + acerto
  );
}

//final
function game_over() {
  for (let i = 0; i < btn_letras.length; i++) {
    btn_letras[i].disabled = true;
  }
  generarLetras.disabled = false;
}
game_over();

function id(str) {
  return document.getElementById(str);
}
function obtener_random(num_min, num_max) {
  const amplitud_valores = num_max - num_min;
  const valor_al_azar = Math.floor(Math.random() * amplitud_valores) + num_min;
  return valor_al_azar;
}
