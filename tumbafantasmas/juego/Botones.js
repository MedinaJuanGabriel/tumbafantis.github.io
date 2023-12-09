function dibujaBotonRectangular(x, y, ancho, alto, texto) {
  // Establecer colores para el botón
  //Colores para los diferentes estados del mismo segun interaccion:
  let fondo = color(179, 183, 153, 150); // Color del fondo del botón con transparencia
  let borde = color(100); // Color del borde del botón

  // Dibuja el fondo del botón
  if (colisionConBotonRectangular(x, y, ancho, alto)) {
  } else {
    fill(fondo); // Establece el color de relleno del botón al color de fondo
  }
  stroke(borde); // Establece el color del borde del botón
  rectMode(CENTER); // Configura el modo de dibujo de rectángulos

  // Dibuja el rectángulo del botón en la posición especificada
  rect(x, y, ancho, alto);

  // Dibujar el texto dentro del botón
  fill(0); // Establecer color negro para el texto
  textAlign(CENTER, CENTER); // Alinear el texto al centro del botón
  textSize(13); // Tamaño del texto
  text(texto, x, y); // Posicionar el texto en el centro del botón
}

// Establecemos la colisión del botón con el mouse:
function colisionConBotonRectangular(x, y, ancho, alto) {
  // Verifica si las coordenadas del mouse están dentro de los límites del botón
  return (
    mouseX > x - ancho / 2 &&
    mouseX < x + ancho / 2 &&
    mouseY > y - alto / 2 &&
    mouseY < y + alto / 2
  );
}
