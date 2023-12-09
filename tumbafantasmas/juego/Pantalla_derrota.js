function derrota() {
  image(fondos[4], 0, 0); // Muestra la imagen de fondo correspondiente al estado de derrota
  textSize(32);
  fill(255);
  text('Derrota', width / 2, height / 2); // Muestra el texto "Derrota" en el centro de la pantalla
  textSize(18);
  text('Toca la tecla R para reiniciar', width / 2, height / 3); // Muestra instrucciones para reiniciar el juego
  text('Toca la tecla M para menú', width / 2, 150); // Muestra instrucciones para regresar al menú principal
}
