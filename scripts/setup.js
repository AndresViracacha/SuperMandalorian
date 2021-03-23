function crearPersonaje(player, game, Phaser, skin) {
  player = game.add.sprite(32, 32, skin);
  game.physics.enable(player, Phaser.Physics.ARCADE);
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
  plataformas.create(0, 900, "plataforma");
  plataformas.create(0, 250, "plataforma");
  plataformas.create(500, 500, "plataforma");
  plataformas.create(950, 500, "plataforma");
  plataformas.setAll("body.immovable", true);
  return plataformas;
}

function crearLetrerosJugadores(nombreJugador, game, player, color, letrero) {
  nombreJugador = game.add.text(
    player.body.position.x,
    player.body.position.y,
    letrero,
    {
      font: "20px Arial",
      fill: color,
      fontWeight: "bold",
      align: "center",
    }
  );
  return nombreJugador;
}

function crearTextoTiempo(tiempoTexto, game, tiempo) {
  tiempoTexto = game.add.text(game.world.centerX, 100, tiempo, {
    font: "65px Arial",
    fill: "#ffff00",
    align: "center",
  });
  tiempoTexto.anchor.set(0.5);
  return tiempoTexto;
}

function crearFondo(game) {
  fondo = game.add.sprite(0, 0, "fondo");
  pepitas = game.add.sprite(960, 0, "pepitas");
  pepitas2 = game.add.sprite(-960, 0, "pepitas");
  pepitas3 = game.add.sprite(-2880, 0, "pepitas");
  montañas = game.add.sprite(960, 0, "montañas");
  montañas2 = game.add.sprite(-960, 0, "montañas");
  montañas3 = game.add.sprite(-2880, 0, "montañas");

  return {
    fondo,
    pepitas,
    pepitas2,
    pepitas3,
    montañas,
    montañas2,
    montañas3,
  };
}
