class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "MenuScene" });
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.add.text(centerX - 60, centerY - 150, "Main Menu", { fontSize: "32px", fill: "#fff" });

        let startButton = this.add.rectangle(centerX, centerY, 200, 50, 0x3498db).setInteractive();
        this.add.text(centerX - 40, centerY - 10, "Start", { fontSize: "24px", fill: "#fff" });

        let optionsButton = this.add.rectangle(centerX, centerY + 100, 200, 50, 0xe74c3c).setInteractive();
        this.add.text(centerX - 50, centerY + 90, "Options", { fontSize: "24px", fill: "#fff" });

        startButton.on("pointerdown", () => this.scene.start("GameScene"));
        optionsButton.on("pointerdown", () => this.scene.start("OptionsScene"));
    }
}
