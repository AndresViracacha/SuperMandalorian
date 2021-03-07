function saltar(player, cursors) {
  if (
    (cursors.up.isDown && player.body.onFloor()) ||
    (player.body.touching.down && cursors.up.isDown)
  ) {
    player.body.velocity.y = -1350;
  }
}
function disparo(player, bullets) {
  bullets.kill();
  player.vida = player.vida - 50;
  if (player.vida <= 0) {
    player.kill();
  }
}

function fireBullet(facing, bullets, player, bulletTime) {
  //  To avoid them being allowed to fire too fast we set a time limit
  if (game.time.now > bulletTime) {
    //  Grab the first bullet we can from the pool
    let bullet = bullets.getFirstExists(false);
    if (bullet) {
      if (facing == "left") {
        //  And fire it
        bullet.reset(player.x + 20, player.y + 30);
        bullet.body.velocity.x = -400;
        bulletTime = game.time.now + 200;
      } else if (facing == "right") {
        bullet.reset(player.x + 20, player.y + 30);
        bullet.body.velocity.x = 400;
        bulletTime = game.time.now + 200;
      }
    }
  }
  return bulletTime;
}
