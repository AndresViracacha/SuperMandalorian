var game = new Phaser.Game(
  window.innerWidth,
  window.innerHeight,
  Phaser.CANVAS,
  "phaser-example"
);
game.state.add("menu", menu);
game.state.add("eleccionPersonajes", eleccionPersonajes);
game.state.add("batalla", batalla);
game.state.start("menu", menu);
