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

var game = new Phaser.Game(
  window.innerWidth,
  window.innerHeight,
  Phaser.CANVAS,
  "phaser-example",
  { preload: preload, create: create, update: update }
);
function preload() {
  game.load.spritesheet(
    "button",
    "./assets/buttons/button_sprite_sheet.png",
    193,
    71
  );
  game.load.spritesheet("dude", "./assets/img/Mandalorian.png", 64, 64);
  game.load.image("plataforma", "./assets/img/plataforma.png");
  game.load.image("fondo", "./assets/img/fondoo.png");
  game.load.image("pepitas", "./assets/img/pepitas.png");
  game.load.image("montañas", "./assets/img/montañas.png");
  game.load.image("bullet", "./assets/img/bala.png");
  game.load.image("barraVida", "./assets/img/barraDeVida.png");
  game.load.spritesheet("kaboom", "./assets/img/explode.png", 128, 128);
  game.load.audio("backSound", "./assets/audio/instrumental.mp3");
  game.load.spritesheet(
    "button",
    "./assets/buttons/button_sprite_sheet.png",
    193,
    71
  );
}

function create() {
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

  musica = game.input.keyboard.addKey(Phaser.Keyboard.P);
  bullets = crearBalas(bullets, game, Phaser);
  bullets2 = crearBalas(bullets2, game, Phaser);
  tiempoTexto = crearTextoTiempo(tiempoTexto, game, tiempo);
  let { cursors, cursors2, fireButton, fireButton2 } = controles(game, Phaser);
  plataformas = crearPlataformas(plataformas, game);
  player = crearPersonaje(player, game, Phaser);
  player2 = crearPersonaje(player2, game, Phaser);
  nombreJugador = crearLetrerosJugadores(
    nombreJugador,
    game,
    player,
    "#F5E20D",
    "J1"
  );
  nombreJugador2 = crearLetrerosJugadores(
    nombreJugador2,
    game,
    player2,
    "#00DDF5",
    "J2"
  );
  backSound = new Phaser.Sound(game, "backSound", 0.5, true);

  barraDeVida = game.add.sprite(32, 32, "barraVida");
  barraDeVida.scale.x = 4;
  barraDeVida.scale.y = 1;

  barraDeVida2 = game.add.sprite(32, 32, "barraVida");
  barraDeVida2.scale.x = 4;
  barraDeVida2.scale.y = 1;

  centroJugadores = game.add.sprite(32, 32, "barraVida");
  centroJugadores.scale.x = 1;
  centroJugadores.scale.y = 1;

  explosion = game.add.sprite(-100, -100, "kaboom");
  explosion.animations.add(
    "explosion",
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    10,
    true
  );

  textoCarga = game.add.text(
    game.world.centerX,
    game.world.centerY,
    "Cargando!",
    {
      font: "350px Arial",
      fill: "#FFFFFF",
      fontWeight: "bold",
      align: "center",
    }
  );
  textoCarga.anchor.set(0.5);
  button = game.add.button(
    -10000,
    -10000,
    "button",
    actionOnClick,
    this,
    2,
    1,
    0
  );
  button.anchor.set(0.5);
  player.position.x = 500;
}

function update() {
  if (backSound.isDecoded) {
    textoCarga.kill();
    button.position.x = game.world.centerX;
    button.position.y = game.world.centerY;
    if (inicio) {
      if (!player.alive && apagado) {
        explosion.position.x = player.position.x - 20;
        explosion.position.y = player.position.y - 40;
        explosion.animations.play("explosion");
        if (explosion.frame == 15) {
          explosion.animations.stop();
          explosion.position.x = -100;
          explosion.position.y = -100;
          apagado = false;
        }
      }

      barraDeVida.position.x = player.position.x;
      barraDeVida.position.y = player.position.y - 10;

      barraDeVida2.position.x = player2.position.x;
      barraDeVida2.position.y = player2.position.y - 10;

      barraDeVida.scale.x = 4 * (player.vida / 100);
      barraDeVida2.scale.x = 4 * (player2.vida / 100);

      parallax(pepitas, pepitas2, pepitas3, montañas, montañas2, montañas3);

      ubicarLetreroJugador(nombreJugador, nombreJugador2, player, player2);

      //Colision jugador1
      if (cursors.down.justDown) {
        clickDelay = this.time.now - lastTime;
        lastTime = this.time.now;
      }
      if (clickDelay < 350) {
        setTimeout(() => {
          clickDelay = 1000;
        }, 250);
      } else {
        if (
          (player.position.y < 240 &&
            player.position.x > 0 &&
            player.position.x < 255) ||
          (player.position.y < 490 &&
            player.position.x > 500 &&
            player.position.x < 755)
        ) {
          game.physics.arcade.collide(player, plataformas);
        }
      }
      //Colision jugador2
      if (cursors2.down.justDown) {
        clickDelay2 = this.time.now - lastTime2;
        lastTime2 = this.time.now;
      }
      if (clickDelay2 < 350) {
        setTimeout(() => {
          clickDelay2 = 1000;
        }, 250);
      } else {
        if (
          (player2.position.y < 240 &&
            player2.position.x > 0 &&
            player2.position.x < 255) ||
          (player2.position.y < 490 &&
            player2.position.x > 500 &&
            player2.position.x < 755)
        ) {
          game.physics.arcade.collide(player2, plataformas);
        }
      }

      //Contador
      tiempo = tiempo - 0.02;
      tiempoTexto.text = Math.floor(tiempo);

      //jugador 1
      player.body.velocity.x = 0;
      facing = caminar(cursors, player, facing, rollRight, rollLeft);
      rollRight = rodarDerecha(cursors, player, rollRight);
      rollLeft = rodarIzquierda(cursors, player, rollLeft);

      //jugador 2
      player2.body.velocity.x = 0;
      facing2 = caminar(cursors2, player2, facing2, rollRight2, rollLeft2);
      rollRight2 = rodarDerecha(cursors2, player2, rollRight2);
      rollLeft2 = rodarIzquierda(cursors2, player2, rollLeft2);

      //disparo
      bulletTime = directionBullet(
        fireButton,
        cursors,
        player,
        bulletTime,
        facing,
        bullets
      );
      bulletTime2 = directionBullet(
        fireButton2,
        cursors2,
        player2,
        bulletTime2,
        facing2,
        bullets2
      );
      game.physics.arcade.overlap(player2, bullets, disparo, null, this);
      game.physics.arcade.overlap(player, bullets2, disparo, null, this);

      //collide da touch y keep y on floor, blocked
      saltar(player, cursors);
      saltar(player2, cursors2);
      //terminar juego
      if (tiempo <= 0) {
        //console.log("termino")
      }
    }
  } else {
    button.alive = false;
  }
}
//plataformas.hash
function actionOnClick() {
  backSound.play();
  button.kill();
  inicio = true;
}
