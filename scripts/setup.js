function crearPersonaje(player, game, Phaser) {
  player = game.add.sprite(32, 32, "dude");
  game.physics.enable(player, Phaser.Physics.ARCADE);
  player.body.gravity.y = 250;
  player.body.bounce.y = 0.2;
  player.body.setSize(24, 58, 20, 0);
  player.body.collideWorldBounds = true;
  player.animations.add("left", [5, 4, 3, 12, 11, 10, 19, 18], 10, true);
  player.animations.add("right", [0, 1, 2, 7, 8, 9, 14, 15], 10, true);
  player.animations.add("rollRight", [21, 22, 23, 24, 25, 26, 27], 15, true);
  player.animations.add("rollLeft", [34, 33, 32, 31, 30, 29, 28], 15, true);
  player.vida = 100;
  player.nombre = "jugador1";
  return player;
}

function crearBalas(bullets, game, Phaser) {
  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(30, "bullet");
  bullets.setAll("anchor.x", 0.5);
  bullets.setAll("anchor.y", 1);
  bullets.setAll("outOfBoundsKill", true);
  bullets.setAll("checkWorldBounds", true);
  return bullets;
}

function crearPlataformas(plataformas, game) {
  plataformas = game.add.physicsGroup();
  plataformas.create(0, 250, "plataforma");
  plataformas.create(500, 500, "plataforma");
  plataformas.setAll("body.immovable", true);
  return plataformas;
}
