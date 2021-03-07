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
