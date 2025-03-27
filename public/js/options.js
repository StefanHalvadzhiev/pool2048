class OptionsScene extends Phaser.Scene {
    constructor() {
        super({ key: "OptionsScene" });
    }

    create() {
        this.updateUI();

        this.scale.on('resize', () => {
            this.updateUI();
        });
    }

    updateUI() {
        const screenWidth = this.cameras.main.width;
        const screenHeight = this.cameras.main.height;

        this.children.removeAll();

        this.add.text(screenWidth / 2 - 50, screenHeight / 2 - 100, "Options", { fontSize: "32px", fill: "#fff" });

        let backButton = this.add.rectangle(screenWidth - 100, 50, 150, 50, 0xe74c3c).setInteractive();
        this.add.text(screenWidth - 130, 40, "Back", { fontSize: "24px", fill: "#fff" });

        backButton.on("pointerdown", () => this.scene.start("MenuScene"));
    }
}
