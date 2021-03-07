//Traspaso con plataformas
game.physics.arcade.overlap(player, plataformas, aviso, null, this);
game.physics.arcade.overlap(player, perders, morir, null, this);
game.physics.arcade.overlap(player, bolas, todobien, null, this);
game.physics.arcade.overlap(player2, perders, morir, null, this);
game.physics.arcade.overlap(player2, bolas, todobien, null, this);
game.physics.arcade.overlap(player2, bullets, morir, null, this);
player.body.velocity.x = 0;
player2.body.velocity.x = 0;
