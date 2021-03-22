var controles,
  inicio = false,
  player,
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
var menu = {
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

    fondo = game.add.sprite(0, 0, "PrincipipalPersonajes");
    titulo = game.add.sprite(game.world.centerX, 100, "tituloJuego");
    titulo.anchor.set(0.5);
    titulo.position.y = 200;
    musica = game.input.keyboard.addKey(Phaser.Keyboard.P);
    backSound = new Phaser.Sound(game, "backSound", 0.5, true);
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
    button.position.y = 450;
    button.anchor.set(0.5);

    textoCarga = game.add.text(
      game.world.centerX,
      game.world.height - 100,
      "Designed && Programmed\n by Andrés Viracachá",
      {
        font: "15px Arial",
        fill: "#FFFFFF",
        fontWeight: "bold",
        align: "center",
      }
    );
    textoCarga.anchor.set(0.5);
  },

  update: function () {
    parallax(pepitas, pepitas2, pepitas3, montañas, montañas2, montañas3);
  },
  actionOnClick: function () {
    backSound.play();
    button.kill();
    inicio = true;
  },
  botonMenu: function () {
    game.state.start("eleccionPersonajes", eleccionPersonajes);
  },
};
