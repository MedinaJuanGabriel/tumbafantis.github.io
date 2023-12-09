//Funcion contador
function contadorvictoria(){
   // Mostrar el contador de recolectables
    fill(255);
    textSize(20);
    text(`Fantis:${contadorFantis}`, 500, 30);
}

// Funcion limites del jugador/personaje
function moverJugador() {
  posX += velocidadX;
  posY += velocidadY;

  // Limita el movimiento horizontal del personaje entre 0 y 550
  if (posX < 0) {
    posX = 0;
  } else if (posX > 550) {
    posX = 550;
  }

  // Limita el movimiento vertical del personaje entre 300 y 400
  if (posY < 310) {
    posY = 310;
  } else if (posY > 400) {
    posY = 400;
  }
}

// Generación de los obstáculos "Demobalas"
function generarDemobalas() {
  for (let i = demobalas.length; i < 5; i++) {
    regenerarDemobala();
  }
}

// Movimiento de los obstáculos "Demobalas"
function moverDemobalas() {
  for (let i = demobalas.length - 1; i >= 0; i--) {
    demobalas[i].y += demobalas[i].velocidad;
    if (demobalas[i].y > height) {
      demobalas.splice(i, 1);
      regenerarDemobala();
    }
  }
}

// Mostrar los obstáculos "Demobalas"
function mostrarDemobalas() {
  for (let i = 0; i < demobalas.length; i++) {
    let obs = demobalas[i];
    image(enemigoImg, obs.x, obs.y);
  }
}


// Generar un obstáculo "Demobala" nuevo
function regenerarDemobala() {
  let x = random(0, 570);
  let y = random(-200, -10);
  let velocidad = random(velocidadDemobalas[0], velocidadDemobalas[1]);
  demobalas.push({ x, y, velocidad });
}

// Verificar colisiones con los obstáculos "Demobalas"
function verificarColision() {
  for (let i = 0; i < demobalas.length; i++) {
    let obs = demobalas[i];
    if (posX + enemigoImg.width > obs.x && posX < obs.x + enemigoImg.width && posY + enemigoImg.height > obs.y && posY < obs.y + enemigoImg.height) {
      estado = 4;
    }
  }
}

// Generación de los recolectables "Fantis"
function generarFantis() {
  posXFantis = random(0, 560);
  posYFantis = random(-50, 0);
}

// Movimiento de los recolectables "Fantis"
function moverFantis() {
  posYFantis += velocidadFantis;

  // Verifica si el "Fantis" llega abajo de la pantalla y lo regenera
  if (posYFantis > height) {
    generarFantis();
  }
}

// Verificar interacciones con los recolectables "Fantis"
function verificarFantis() {
  let d = dist(posX, posY, posXFantis, posYFantis);
  if (d < 20) {
    contadorFantis++;
    generarFantis();
  }
}
