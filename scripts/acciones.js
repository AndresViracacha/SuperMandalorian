function saltar(player, cursors) {
  if (
    (cursors.up.isDown && player.body.onFloor()) ||
    (player.body.touching.down && cursors.up.isDown)
  ) {
    player.body.velocity.y = -550;
  }
}
function disparo(jugador, bullets) {
  bullets.kill();
  jugador.vida = jugador.vida - 10;
}

function fireBullet(facing, bullets, player, bulletTime, direction) {
  if (game.time.now > bulletTime) {
    let bullet = bullets.getFirstExists(false);
    if (bullet) {
      bullet.reset(player.x + 20, player.y + 30);
      switch (direction) {
        case "ud":
          bullet.body.velocity.x = 400;
          bullet.body.velocity.y = -400;
          break;
        case "ui":
          bullet.body.velocity.x = -400;
          bullet.body.velocity.y = -400;
          break;
        case "dd":
          bullet.body.velocity.x = 400;
          bullet.body.velocity.y = 400;
          break;
        case "di":
          bullet.body.velocity.x = -400;
          bullet.body.velocity.y = 400;
          break;
        case "u":
          bullet.body.velocity.y = -400;
          break;
        case "d":
          bullet.body.velocity.y = 400;
          break;

        default:
          if (facing == "left") {
            bullet.body.velocity.x = -400;
          } else if (facing == "right") {
            bullet.body.velocity.x = 400;
          }
          break;
      }
      bulletTime = game.time.now + 200;
    }
  }
  return bulletTime;
}

function directionBullet(
  fireButton,
  cursors,
  player,
  bulletTime,
  facing,
  bullets
) {
  if (
    fireButton.isDown &&
    cursors.up.isDown &&
    cursors.right.isDown &&
    player.alive
  ) {
    bulletTime = fireBullet(facing, bullets, player, bulletTime, "ud");
  } else if (
    fireButton.isDown &&
    cursors.up.isDown &&
    cursors.left.isDown &&
    player.alive
  ) {
    bulletTime = fireBullet(facing, bullets, player, bulletTime, "ui");
  } else if (
    fireButton.isDown &&
    cursors.down.isDown &&
    cursors.left.isDown &&
    player.alive
  ) {
    bulletTime = fireBullet(facing, bullets, player, bulletTime, "di");
  } else if (
    fireButton.isDown &&
    cursors.down.isDown &&
    cursors.right.isDown &&
    player.alive
  ) {
    bulletTime = fireBullet(facing, bullets, player, bulletTime, "dd");
  } else if (fireButton.isDown && cursors.up.isDown && player.alive) {
    bulletTime = fireBullet(facing, bullets, player, bulletTime, "u");
  } else if (fireButton.isDown && cursors.down.isDown && player.alive) {
    bulletTime = fireBullet(facing, bullets, player, bulletTime, "d");
  } else if (fireButton.isDown && player.alive) {
    bulletTime = fireBullet(facing, bullets, player, bulletTime);
  }
  return bulletTime;
}
