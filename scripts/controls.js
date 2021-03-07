function controles(game, Phaser) {
  cursors = game.input.keyboard.createCursorKeys();
  cursors2 = game.input.keyboard.addKeys({
    up: Phaser.KeyCode.W,
    down: Phaser.KeyCode.S,
    left: Phaser.KeyCode.A,
    right: Phaser.KeyCode.D,
  });
  fireButton = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_5);
  fireButton2 = game.input.keyboard.addKey(Phaser.Keyboard.Y);

  return {
    cursors,
    cursors2,
    fireButton,
    fireButton2,
  };
}
