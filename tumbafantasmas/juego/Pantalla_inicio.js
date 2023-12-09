function pantallainicio() {
  image(fondos[0], 0, 0); // Muestra la imagen de fondo correspondiente a la pantalla de inicio
  push();
  fill(0);
  textAlign(CENTER);
  textSize(45);
  textFont(tumbigrafia);
  text("TUMBAFANTIS", width/2, 65); // Muestra el título del juego en la parte superior
  pop();
  textFont(ochobits);

  // Dibuja tres botones rectangulares en la pantalla de inicio: "JUGAR", "CREDITOS" e "INSTRUCCIONES"
  dibujaBotonRectangular(width/2, height/3, 170, 75, "JUGAR");
  dibujaBotonRectangular(width/2, height/2, 170, 75, "CREDITOS");
  dibujaBotonRectangular(300, 400, 170, 75, "INSTRUCCIONES");
}
