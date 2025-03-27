// Import scenes the standard way
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [MenuScene, GameScene, OptionsScene] // Reference classes directly
};

const game = new Phaser.Game(config);

// Resize game when window resizes
window.addEventListener("resize", () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});
