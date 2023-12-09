// Funciones para el estado 5 (victoria)
function victoria() {
  image(fondos[5], 0, 0); // Muestra la imagen de fondo de victoria en la pantalla
  textSize(32); // Establece el tamaño del texto a 32
  fill(255); // Establece el color del texto a blanco
  text('¡Victoria!', width / 2, height / 2); // Muestra el texto "¡Victoria!" en el centro de la pantalla
  textSize(18); // Establece el tamaño del texto a 18
  text('Toca la tecla R para reiniciar', width / 2, height / 3); // Muestra instrucciones para reiniciar el juego
  text('Toca la tecla M para menú', width / 2, 150); // Muestra instrucciones para volver al menú principal
}
