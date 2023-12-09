/*Alumno:Juan Gabriel Medina   Legajo:93530/3    Comision: 3     docente:David Bedoian  Materia: Tecnologia Multimedia 1
Trabajo practico 4: Introducción a P5.js/juego interactivo simple de tipo arcade 
Enlace al video explicativo: https://www.youtube.com/watch?v=hVsmhhc68uI
*/

// Declaración de variables

//Variables grenerales
let estado = 0; // Almacena el estado actual del juego (0: Pantalla de inicio, 1: Juego, 2: Créditos, 3: Instrucciones, 4: Derrota, 5: Victoria).

// Variables de control de victoria y derrota
let victoriamarca = false; // Indica si el jugador ha alcanzado la victoria.
let derrotamarca = false; // Indica si el jugador ha perdido el juego (derrota).

// Imágenes del juego
let fondos = []; // Un arreglo para almacenar imágenes de fondo del juego.
let tumbi = []; // Un arreglo para almacenar imágenes de las tumbas en el juego.
let enemigoImg; // Almacena la imagen del enemigo en el juego.
let fantisImg; // Almacena la imagen del recolectable "Fantis" en el juego.

// Variables del jugador/personaje
let posX = 300; // La posición X actual del jugador en el juego.
let posY = 350; // La posición Y actual del jugador en el juego.
let velocidad = 5; // La velocidad de movimiento del jugador.
let velocidadX = 0; // La velocidad en la dirección X del jugador.
let velocidadY = 0; // La velocidad en la dirección Y del jugador.
let cuadroActual = 0; // El índice del cuadro de animación actual del jugador.

// Variables relacionadas con el recolectable "Fantis"
let posXFantis; // La posición X actual del recolectable "Fantis".
let posYFantis; // La posición Y actual del recolectable "Fantis".
let contadorFantis = 0; // El contador de recolectables "Fantis" recogidos por el jugador.
let velocidadFantis = 4; // La velocidad de movimiento del recolectable "Fantis".

// Obstáculos "Demobalas"
let demobalas = []; // Un arreglo para almacenar los obstáculos "Demobalas" en el juego.
let velocidadDemobalas = [4, 6]; // El rango de velocidad de los obstáculos "Demobalas".

// Función de precarga
function preload() {
  // Carga las fuentes de texto
  tumbigrafia = loadFont('assets/tombstone.TTF');
  ochobits = loadFont('assets/jueguito.TTF');

  // Carga las imágenes de fondo
  for (let i = 0; i < 6; i++) {
    fondos[i] = loadImage("assets/fondo" + nf(i, 2) + ".png");
    // 'nf(i, 2)' genera un número con 2 dígitos (rellenados con ceros a la izquierda si es necesario)
  }

  // Carga las imágenes de tumbi
  for (let i = 0; i < 5; i++) {
    tumbi[i] = loadImage("assets/tumba" + nf(i, 2) + ".png");
    // 'nf(i, 2)' genera un número con 2 dígitos (rellenados con ceros a la izquierda si es necesario)
  }

  // Carga la imagen del enemigo
  enemigoImg = loadImage("assets/demobalas.png");

  // Carga la imagen del recolectable "Fantis"
  fantisImg = loadImage("assets/fantis.png");
}

// Configuración inicial
function setup() {
  // Crear un lienzo (canvas) de 600x600 píxeles
  let canvas = createCanvas(600, 600);
  canvas.parent('juego-container'); 
  // Generar obstáculos "Demobalas"
  generarDemobalas();
  
  // Generar recolectables "Fantis"
  generarFantis();
}

// Función principal de dibujo
function draw() {
  if (estado === 0) {
    // Pantalla de inicio
    pantallainicio();
  } else if (estado === 1) { 
    // Pantalla de juego

    // Dibujar fondo de juego
    image(fondos[1], 0, 0);

    // Dibujar la tumba del jugador
    image(tumbi[cuadroActual], posX, posY);

    // Mover y mostrar obstáculos "Demobalas"
    moverDemobalas();
    mostrarDemobalas();

    // Mover al jugador
    moverJugador();

    // Verificar interacciones solo si no se ha alcanzado la victoria
    if (!victoriamarca) {
      image(fantisImg, posXFantis, posYFantis, 50, 60);
      moverFantis();
      verificarFantis();
      verificarColision();
    }
    //contador de victoria
     contadorvictoria();  
     
    // Verificar la condición de victoria
    if (contadorFantis >= 13) {
      victoriamarca = true;
    }

    // Si se ha alcanzado la victoria, cambiar al estado de victoria
    if (victoriamarca) {
      estado = 5;
    }
  } else if (estado === 2) {
    // Pantalla de "créditos"
    image(fondos[2], 0, 0);
    pantallacreditos();
  } else if (estado === 3) {
    // Pantalla de "instrucciones"

    // Dibujar fondo de instrucciones
    image(fondos[3], 0, 0);

    // Dibujar botón "Volver atrás"
    dibujaBotonRectangular(300, 550, 170, 60, "Volver atrás");
  } else if (estado === 4) {
    // Pantalla de derrota
    derrota();
  } else if (estado === 5) {
    // Pantalla de victoria
    victoria();
  }
}

// Función para reiniciar el juego
function reiniciarJuego() {
  // Restablece las variables del juego a sus valores iniciales
  posX = 300; // Posición horizontal del jugador
  posY = 350; // Posición vertical del jugador
  contadorFantis = 0; // Contador de recolectables recolectados
  velocidadX = 0; // Velocidad horizontal del jugador
  velocidadY = 0; // Velocidad vertical del jugador
  cuadroActual = 0; // Índice de animación de la tumba
  victoriamarca = false; // Marca de victoria (reiniciada)
  derrotamarca = false; // Marca de derrota (reiniciada)

  // Restablece la generación de elementos aleatorios
  demobalas = []; // Restablece la matriz de obstáculos "Demobalas" vacía
  generarDemobalas(); // Genera nuevos obstáculos "Demobalas"
  generarFantis(); // Genera nuevos recolectables "Fantis"
}

function keyPressed() {
  if ((key === 'r' || key === 'R') && (estado === 4 || estado === 5)) {
    estado = 1;
    reiniciarJuego(); // Llama a la función para reiniciar el juego si se presiona 'r' o 'R' en estado 4 o 5
  } else if ((key === 'm' || key === 'M') && (estado === 4 || estado === 5)) {
    estado = 0;
    reiniciarJuego(); // Llama a la función para reiniciar el juego si se presiona 'm' o 'M' en estado 4 o 5
  } else if (keyCode === LEFT_ARROW) {
    velocidadX = -velocidad; // Establece una velocidad horizontal negativa si se presiona la tecla de flecha izquierda
    cuadroActual = 4; // Cambia el índice de animación para la dirección izquierda
  } else if (keyCode === RIGHT_ARROW) {
    velocidadX = velocidad; // Establece una velocidad horizontal positiva si se presiona la tecla de flecha derecha
    cuadroActual = 3; // Cambia el índice de animación para la dirección derecha
  } else if (keyCode === UP_ARROW) {
    velocidadY = -velocidad; // Establece una velocidad vertical negativa si se presiona la tecla de flecha arriba
    cuadroActual = 2; // Cambia el índice de animación para la dirección arriba
  } else if (keyCode === DOWN_ARROW) {
    velocidadY = velocidad; // Establece una velocidad vertical positiva si se presiona la tecla de flecha abajo
    cuadroActual = 1; // Cambia el índice de animación para la dirección abajo
  }
}


function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW || keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
    velocidadX = 0; // Detiene la velocidad horizontal cuando se suelta una tecla de flecha
    velocidadY = 0; // Detiene la velocidad vertical cuando se suelta una tecla de flecha
    cuadroActual = 0; // Restablece la animación del jugador a su estado predeterminado cuando se suelta una tecla de flecha
  }
}
function mousePressed() {
  if (estado === 0) {
    if (colisionConBotonRectangular(width / 2, height / 3, 170,75)) {
      console.log("CLICK en boton de jugar"); // Imprime un mensaje en la consola cuando se hace clic en el botón de jugar
      estado = 1; // Cambia el estado del juego a 1 (pantalla de juego)
    } else if (colisionConBotonRectangular(width / 2, height / 2, 170,75)) {
      console.log("CLICK en boton de creditos"); // Imprime un mensaje en la consola cuando se hace clic en el botón de créditos
      estado = 2; // Cambia el estado del juego a 2 (pantalla de créditos)
    } else if (colisionConBotonRectangular(300, 400, 170,75)) {
      console.log("CLICK en boton de instrucciones"); // Imprime un mensaje en la consola cuando se hace clic en el botón de instrucciones
      estado = 3; // Cambia el estado del juego a 3 (pantalla de instrucciones)
    }
  } if (estado===2) {
    if (colisionConBotonRectangular(300, 550, 170, 60)) {
      console.log("CLICK en boton de volver atras") // Imprime un mensaje en la consola cuando se hace clic en el botón de volver atrás desde la pantalla de créditos
      estado=0; // Cambia el estado del juego de regreso a 0 (pantalla de inicio)
    }
  } if (estado===3) {
    if (colisionConBotonRectangular(300, 550, 170, 60)) {
      console.log("CLICK en boton de volver atras") // Imprime un mensaje en la consola cuando se hace clic en el botón de volver atrás desde la pantalla de instrucciones
      estado=0; // Cambia el estado del juego de regreso a 0 (pantalla de inicio)
    }   
  }
}
