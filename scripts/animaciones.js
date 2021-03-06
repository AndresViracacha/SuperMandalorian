function caminar(cursors, player, facing, rollRight, rollLeft) {
  if (!rollRight && !rollLeft) {
    if (cursors.right.isDown) {
      player.animations.play("right");
      facing = "right";
    } else if (cursors.left.isDown) {
      player.animations.play("left");
      facing = "left";
    } else {
      player.animations.stop();
      if (facing == "left") {
        player.frame = 17;
      } else if (facing == "right") {
        player.frame = 16;
      }
    }
  }
  if (cursors.right.isDown) {
    player.body.velocity.x = 150;
  }
  if (cursors.left.isDown) {
    player.body.velocity.x = -150;
  }
  return facing;
}

function rodarDerecha(cursors, player, rollRight) {
  if (cursors.right.isDown && cursors.down.isDown) {
    rollRight = true;
    if (rollRight) {
      player.body.velocity.x += 200;
      player.animations.play("rollRight");
    }
  }
  if (player.frame == 27) {
    player.animations.stop("rollRight");
    rollRight = false;
  }
  return rollRight;
}

function rodarIzquierda(cursors, player, rollLeft) {
  if (cursors.left.isDown && cursors.down.isDown) {
    rollLeft = true;
    if (rollLeft) {
      player.body.velocity.x -= 200;
      player.animations.play("rollLeft");
    }
  }
  if (player.frame == 28) {
    player.animations.stop("rollLeft");
    rollLeft = false;
  }
  return rollLeft;
}
function parallax(pepitas, pepitas2, pepitas3, montañas, montañas2, montañas3) {
  pepitas.position.x = pepitas.position.x + 2;
  pepitas2.position.x = pepitas2.position.x + 2;
  pepitas3.position.x = pepitas3.position.x + 2;
  if (pepitas.position.x >= 2880) {
    pepitas.position.x = -2880;
  }
  if (pepitas2.position.x >= 2880) {
    pepitas2.position.x = -2880;
  }
  if (pepitas3.position.x >= 2880) {
    pepitas3.position.x = -2880;
  }

  montañas.position.x = montañas.position.x + 0.5;
  montañas2.position.x = montañas2.position.x + 0.5;
  montañas3.position.x = montañas3.position.x + 0.5;
  if (montañas.position.x >= 2880) {
    montañas.position.x = -2880;
  }
  if (montañas2.position.x >= 2880) {
    montañas2.position.x = -2880;
  }
  if (montañas3.position.x >= 2880) {
    montañas3.position.x = -2880;
  }
}
function ubicarLetreroJugador(nombreJugador, nombreJugador2, player, player2) {
  nombreJugador.position.x = player.position.x;
  nombreJugador.position.y = player.position.y - 35;
  nombreJugador2.position.x = player2.position.x;
  nombreJugador2.position.y = player2.position.y - 35;
  if (!player2.alive) {
    nombreJugador2.position.x = 10000;
    nombreJugador2.position.y = 10000;
  }
  if (!player.alive) {
    nombreJugador.position.x = 10000;
    nombreJugador.position.y = 10000;
  }
}
