function pantallacreditos() {
  // Título de créditos
  textAlign(CENTER);
  textSize(40);
  fill(230);
  text("Créditos", width / 2, 50);

  // Texto de créditos
  fill(230);
  textSize(13);
  text("Version de la demo: TumbaFantis 0.2", 300, 100);
  text("Juego de recolección y evasión", 300, 150);
  text("Diseño creativo: Juan Gabriel Medina", 300, 200);
  text("Código y programación: Juan Gabriel Medina", width / 2, 250);
  text("Ilustraciones digitales: Juan Gabriel Medina", width / 2, 300);
  text("Diseño de personajes: Juan Gabriel Medina", width / 2, 350);
  text("Desarrolladora multimedia:", 300, 400);
  text("Siwantri Games", 300, 450);
  text("Gracias por jugar,tumbi te agradece", 300, 500);
  
  // Dibuja un botón rectangular "Volver atrás"
  dibujaBotonRectangular(300, 550, 170, 60, "Volver atrás");
}
