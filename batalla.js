var inicio = false,
  player,
  nombreJugador,
  explosions,
  nombreJugador2,
  player2,
  hpPlayer = 100,
  hpPlayer2 = 100,
  tiempo = 45,
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
  apagado2 = true,
  centroJugadores,
  distanciaJugadores,
  backSound,
  aliens,
  eleccion,
  juegoTerminado = false;
var firingTimer = 0;
var livingEnemies = [];
var batalla = {
  preload: function () {
    setup();
  },

  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //Fondo
    var {
      fondo,
      pepitas,
      pepitas2,
      pepitas3,
      montañas,
      montañas2,
      montañas3,
    } = crearFondo(game);
    //Musica
    musica = game.input.keyboard.addKey(Phaser.Keyboard.P);
    //Configuracion del jugador
    bullets = crearBalas(bullets, game, Phaser);
    bullets2 = crearBalas(bullets2, game, Phaser);
    player = crearPersonaje(player, game, Phaser, grupoSkins[skinElegida]);
    player2 = crearPersonaje(player2, game, Phaser, grupoSkins[skinElegida2]);
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
    barraDeVida = game.add.sprite(32, 32, "barraVida");
    barraDeVida.scale.x = 4;
    barraDeVida.scale.y = 1;
    barraDeVida2 = game.add.sprite(32, 32, "barraVida");
    barraDeVida2.scale.x = 4;
    barraDeVida2.scale.y = 1;

    plataformas = crearPlataformas(plataformas, game);
    backSound = new Phaser.Sound(game, "backSound", 0.5, true);

    let { cursors, cursors2, fireButton, fireButton2 } = controles(
      game,
      Phaser
    );

    explosion = game.add.sprite(-100, -100, "kaboom");
    explosion.animations.add(
      "explosion",
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      10,
      true
    );
    explosion2 = game.add.sprite(-100, -100, "kaboom");
    explosion2.animations.add(
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
      this.inicioPartida,
      this,
      2,
      1,
      0
    );
    button.anchor.set(0.5);
    player.position.x = 1000;

    //Enemigos
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30, "enemyBullet");
    enemyBullets.setAll("anchor.x", 0.5);
    enemyBullets.setAll("anchor.y", 1);
    enemyBullets.setAll("outOfBoundsKill", true);
    enemyBullets.setAll("checkWorldBounds", true);

    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;
    tiempoTexto = crearTextoTiempo(tiempoTexto, game, tiempo);
  },

  update: function () {
    if (backSound.isDecoded) {
      textoCarga.kill();
      button.position.x = game.world.centerX;
      button.position.y = game.world.centerY;
      if (inicio) {
        if (player.vida <= 0) {
          player.kill();
          juegoTerminado = true;
        }
        if (player2.vida <= 0) {
          player2.kill();
          juegoTerminado = true;
        }
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
        if (!player2.alive && apagado2) {
          explosion2.position.x = player2.position.x - 20;
          explosion2.position.y = player2.position.y - 40;
          explosion2.animations.play("explosion");
          if (explosion2.frame == 15) {
            explosion2.animations.stop();
            explosion2.position.x = -100;
            explosion2.position.y = -100;
            apagado2 = false;
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
        if (tiempoTexto.text == "0") {
          this.createAliens();
        }
        if (Math.floor(tiempo) <= -1) {
          tiempoTexto.text = "¡Muerte Subita!";
        }
        if (!player.alive) {
          tiempoTexto.text = "¡Ganador\n Jugador 2!";
        }
        if (!player2.alive) {
          tiempoTexto.text = "¡Ganador\n Jugador 1!";
        }
        if (!player.alive && !player2.alive) {
          tiempoTexto.text = "¡Esto es un empate!";
        }

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
        game.physics.arcade.overlap(
          enemyBullets,
          player,
          this.enemyHitsPlayer,
          null,
          this
        );
        game.physics.arcade.overlap(
          enemyBullets,
          player2,
          this.enemyHitsPlayer,
          null,
          this
        );
        if (game.time.now > firingTimer) {
          this.enemyFires();
        }

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
  },
  //plataformas.hash
  inicioPartida: function () {
    backSound.play();
    button.kill();
    inicio = true;
  },
  createAliens: function () {
    for (var y = 0; y < 1; y++) {
      for (var x = 0; x < 10; x++) {
        var alien = aliens.create(x * 100, y * 50, "invader");
        alien.anchor.setTo(0.5, 0.5);
        alien.animations.add("fly", [0, 1, 2, 3], 20, true);
        alien.play("fly");
        alien.body.moves = false;
      }
    }
    aliens.x = 0;
    aliens.y = 50;
    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
    var tween = game.add
      .tween(aliens)
      .to({ x: 1000 }, 5000, Phaser.Easing.Linear.None, true, 0, 1000, true);
  },
  setupInvader: function (invader) {
    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add("kaboom");
  },
  descend: function () {
    aliens.y += 10;
  },
  enemyHitsPlayer: function (player, bullet) {
    console.log(bullet);
    console.log(player);
    bullet.kill();
    player.vida -= 10;
  },

  enemyFires: function () {
    //  Grab the first bullet we can from the pool
    enemyBullet = enemyBullets.getFirstExists(false);

    livingEnemies.length = 0;

    aliens.forEachAlive(function (alien) {
      // put every living enemy in an array
      livingEnemies.push(alien);
    });

    if (enemyBullet && livingEnemies.length > 0) {
      var random = game.rnd.integerInRange(0, livingEnemies.length - 1);

      // randomly select one of them
      var shooter = livingEnemies[random];
      // And fire the bullet from this enemy
      if (!juegoTerminado) {
        enemyBullet.reset(shooter.body.x, shooter.body.y);
      }

      if (eleccion) {
        game.physics.arcade.moveToObject(enemyBullet, player, 500);
        eleccion = !eleccion;
      } else {
        game.physics.arcade.moveToObject(enemyBullet, player2, 500);
        eleccion = !eleccion;
      }
      firingTimer = game.time.now + 500;
    }
  },
};
