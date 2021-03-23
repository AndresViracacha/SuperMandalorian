function setup() {
  game.load.spritesheet(
    "button",
    "./assets/buttons/button_sprite_sheet.png",
    193,
    71
  );
  game.load.image("BotonJugar", "./assets/img/BotonJugar.png");
  game.load.image(
    "PrincipipalPersonajes",
    "./assets/img/PresentacionPersonajes.png"
  );
  game.load.image("seleccionPersonaje", "./assets/img/seleccionaPersonaje.png");
  game.load.image("tituloJuego", "./assets/img/Titulo.png");
  game.load.spritesheet("dude", "./assets/img/Mandalorian.png", 64, 64);
  game.load.image("plataforma", "./assets/img/plataforma2.png");
  game.load.image("fondo", "./assets/img/fondoo.png");
  game.load.image("pepitas", "./assets/img/pepitas.png");
  game.load.image("montañas", "./assets/img/montañas.png");
  game.load.image("bullet", "./assets/img/bala.png");
  game.load.image("barraVida", "./assets/img/barraDeVida.png");
  game.load.image("flecha", "./assets/img/Flecha.png");
  game.load.spritesheet("kaboom", "./assets/img/explode.png", 128, 128);
  game.load.audio("backSound", "./assets/audio/instrumental.mp3");
  game.load.spritesheet(
    "button",
    "./assets/buttons/button_sprite_sheet.png",
    193,
    71
  );

  //personajes
  game.load.spritesheet(
    "playerAmarillo",
    "./assets/img/playerAmarillo.png",
    64,
    64
  );
  game.load.spritesheet("playerAzul", "./assets/img/playerAzul.png", 64, 64);
  game.load.spritesheet(
    "playerBlanco",
    "./assets/img/playerBlanco.png",
    64,
    64
  );
  game.load.spritesheet(
    "playerMorado",
    "./assets/img/playerMorado.png",
    64,
    64
  );
  game.load.spritesheet(
    "playerNaranja",
    "./assets/img/playerNaranja.png",
    64,
    64
  );
  game.load.spritesheet("playerNegro", "./assets/img/playerNegro.png", 64, 64);
  game.load.spritesheet("playerRojo", "./assets/img/playerRojo.png", 64, 64);
  game.load.spritesheet("playerVerde", "./assets/img/playerVerde.png", 64, 64);
  game.load.image("enemyBullet", "./assets/img/enemy-bullet.png");
  game.load.spritesheet("invader", "./assets/img/invader32x32x4.png", 32, 32);
}
