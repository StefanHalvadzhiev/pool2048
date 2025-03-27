class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }

    create() {
        const screenWidth = this.cameras.main.width;
        const screenHeight = this.cameras.main.height;
        const circleSize = Math.min(screenWidth, screenHeight) * 0.1;

        this.matter.world.setBounds(0, 0, screenWidth, screenHeight);

        this.circles = [];

        this.player = this.matter.add.circle(screenWidth / 2, screenHeight / 2, circleSize / 2, {
            restitution: 0.8, 
            friction: 0.1,
            inertia: Infinity,
        });

        this.playerGraphics = this.add.graphics({ fillStyle: { color: 0xffffff } });
        this.playerGraphics.fillCircleShape(this.player);

        for (let i = 0; i < 5; i++) {
            let x = Phaser.Math.Between(circleSize, screenWidth - circleSize);
            let y = Phaser.Math.Between(circleSize, screenHeight - circleSize);

            let circle = this.matter.add.circle(x, y, circleSize / 2, {
                restitution: 0.8,
                friction: 0.1,
                inertia: Infinity,
            });

            let graphics = this.add.graphics({ fillStyle: { color: 0x3498db } });
            graphics.fillCircleShape(circle);

            this.circles.push({ body: circle, graphics: graphics });

            graphics.setInteractive(new Phaser.Geom.Circle(x, y, circleSize / 2), Phaser.Geom.Circle.Contains);
            graphics.on("pointerdown", () => {
                this.matter.body.setVelocity(circle, Phaser.Math.Between(-5, 5), Phaser.Math.Between(-5, 5));
            });
        }

        this.input.on("pointermove", (pointer) => {
            this.movePlayer(pointer.x, pointer.y);
        });
    }

    movePlayer(targetX, targetY) {
        const speed = 5;
        let angle = Phaser.Math.Angle.Between(this.player.position.x, this.player.position.y, targetX, targetY);
        let velocityX = Math.cos(angle) * speed;
        let velocityY = Math.sin(angle) * speed;
        this.matter.body.setVelocity(this.player, { x: velocityX, y: velocityY });
    }

    update() {
        this.playerGraphics.x = this.player.position.x;
        this.playerGraphics.y = this.player.position.y;

        this.circles.forEach(({ body, graphics }) => {
            graphics.x = body.position.x;
            graphics.y = body.position.y;
        });
    }
}
