var skinElegida = 0,
  skinElegida2 = 0,
  eleccionLetrero1,
  controles,
  inicio = false,
  skinP1,
  skinP2,
  nombreJugador,
  explosions,
  nombreJugador2,
  player2,
  hpPlayer = 100,
  hpPlayer2 = 100,
  tiempo = 90,
  tiempoTexto,
  textoCarga,
  text,
  facing,
  facing2,
  cursors,
  cursors2,
  plataformas,
  rollRight,
  rollLeft,
  rollRight2,
  rollLeft2,
  jumpTimer,
  background,
  lastTime,
  clickDelay,
  lastTime2,
  clickDelay2,
  bullets,
  bullets2,
  bulletTime = 0,
  bulletTime2 = 0,
  fireButton,
  fireButton2,
  barraDeVida,
  barraDeVida2,
  apagado = true,
  centroJugadores,
  distanciaJugadores,
  backSound;
var button2, button3, button4, button5;
var grupoSkins = [
  "playerAmarillo",
  "playerAzul",
  "playerBlanco",
  "playerMorado",
  "playerNaranja",
  "playerNegro",
  "playerRojo",
  "playerVerde",
  "dude",
];
var eleccionPersonajes = {
  preload: function () {
    setup();
  },

  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    var {
      fondo,
      pepitas,
      pepitas2,
      pepitas3,
      montañas,
      montañas2,
      montañas3,
    } = crearFondo(game);

    //Titulo
    titulo = game.add.sprite(game.world.centerX, 100, "seleccionPersonaje");
    titulo.anchor.set(0.5);
    titulo.scale.set(0.3);
    titulo.position.y = 200;
    //musica
    musica = game.input.keyboard.addKey(Phaser.Keyboard.P);
    backSound = new Phaser.Sound(game, "backSound", 0.5, true);
    //boton
    button = game.add.button(
      game.world.centerX,
      0,
      "BotonJugar",
      this.botonMenu,
      this,
      2,
      1,
      0
    );
    button.scale.set(0.7);
    button.position.y = game.world.height - 200;
    button.anchor.set(0.5);

    //flechas
    button2 = game.add.button(
      game.world.centerX / 4 - 10,
      game.world.centerY,
      "flecha",
      this.cambiarSkinsIzquierda,
      this,
      2,
      1,
      0
    );
    button2.scale.set(0.2);
    button2.anchor.set(0.5);

    button3 = game.add.button(
      game.world.centerX / 2 + 20,
      game.world.centerY,
      "flecha",
      this.cambiarSkinsDerecha,
      this,
      2,
      1,
      0
    );
    button3.scale.set(0.2);
    button3.scale.x = -button3.scale.x;
    button3.anchor.set(0.5);

    button4 = game.add.button(
      Math.floor((game.world.centerX * 6) / 4 - 60),
      game.world.centerY,
      "flecha",
      this.cambiarSkinsIzquierda2,
      this,
      2,
      1,
      0
    );
    button4.scale.set(0.2);
    button4.scale.x = button4.scale.x;
    button4.anchor.set(0.5);

    button5 = game.add.button(
      Math.floor((game.world.centerX * 6) / 4 + 130),
      game.world.centerY,
      "flecha",
      this.cambiarSkinsDerecha2,
      this,
      2,
      1,
      0
    );
    button5.scale.set(0.2);
    button5.scale.x = -button4.scale.x;
    button5.anchor.set(0.5);

    //Seleccion personaje 1
    skinP1 = game.add.group();
    skinP1.scale.set(2);
    skinP1.position.x = Math.floor(game.world.centerX / 3 - 30);
    skinP1.position.y = game.world.centerY - 120;
    this.crearSkins(skinP1);
    skinP2 = game.add.group();
    skinP2.scale.set(2);
    skinP2.position.x = Math.floor((game.world.centerX * 6) / 4 - 30);
    skinP2.position.y = game.world.centerY - 120;
    this.crearSkins(skinP2);

    //testos
    eleccionLetrero1 = game.add.text(280, 400, "Jugador 1", {
      font: "30px Arial",
      fill: "#FF0000",
      fontWeight: "bold",
      align: "center",
    });
    eleccionLetrero2 = game.add.text(1400, 400, "Jugador 2", {
      font: "30px Arial",
      fill: "#FF0000",
      fontWeight: "bold",
      align: "center",
    });
  },

  update: function () {
    skinP1.position.x = Math.floor(skinP1.position.x);
    parallax(pepitas, pepitas2, pepitas3, montañas, montañas2, montañas3);
  },
  actionOnClick: function () {
    backSound.play();
    button.kill();
    inicio = true;
  },
  botonMenu: function () {
    game.state.start("batalla", batalla);
  },
  crearSkins: function (skinP1) {
    for (let i = 0; i < 9; i++) {
      skin = skinP1.create(3200 * i, 32, grupoSkins[i]);
      skin.animations.add("left", [5, 4, 3, 12, 11, 10, 19, 18], 10, true);
      skin.animations.add("right", [0, 1, 2, 7, 8, 9, 14, 15], 10, true);
      skin.animations.add("rollRight", [21, 22, 23, 24, 25, 26, 27], 15, true);
      skin.animations.add("rollLeft", [34, 33, 32, 31, 30, 29, 28], 15, true);
      skin.play("right");
    }
  },
  cambiarSkinsDerecha: function () {
    skinElegida++;
    if (skinElegida == 9) {
      skinElegida = 0;
    }
    skinP1.position.x = skinP1.position.x - 6400;
    if (skinP1.position.x == -57310) {
      skinP1.position.x = 290;
    }
  },
  cambiarSkinsIzquierda: function () {
    skinElegida--;
    if (skinElegida == -1) {
      skinElegida = 8;
    }
    skinP1.position.x = skinP1.position.x + 6400;
    if (skinP1.position.x == 6690) {
      skinP1.position.x = -50910;
    }
  },
  cambiarSkinsDerecha2: function () {
    skinElegida2++;
    if (skinElegida2 == 9) {
      skinElegida2 = 0;
    }
    skinP2.position.x = skinP2.position.x - 6400;
    if (skinP2.position.x <= -56190) {
      skinP2.position.x = 1410;
    }
  },
  cambiarSkinsIzquierda2: function () {
    skinElegida2--;
    if (skinElegida2 == -1) {
      skinElegida2 = 8;
    }
    skinP2.position.x = skinP2.position.x + 6400;
    if (skinP2.position.x == 7810) {
      skinP2.position.x = -49790;
    }
  },
};
