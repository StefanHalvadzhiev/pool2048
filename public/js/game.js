class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }

    preload() {
        const theme = {
            ballRadius: 30,
            numberOfGeneratedBalls: 5,
            ballsImageWidth: 80,
            numeratedDefaultBallFillStyle: '#FF5733',
            numeratedDefaultBallStrokeStyle: '#C70039',
            numeratedDefaultBallStrokeWidth: 5,
            numeratedBallsStrokeStyle: '#900C3F',
            numeratedBallsStrokeWidth: 3,
            numeratedBallsFontSize: '20px',
            numeratedBallsFont: 'Arial',
            numeratedBallsTextAlign: 'center',
            numeratedBallsTextBaseline: 'middle',
            numeratedBallsFontColorBelowBallThree: '#ffffff',
            numeratedBallsFontColorAboveBallThree: '#000000',
        };

        const gradient = ['#FF5733', '#C70039', '#900C3F', '#581845', '#DAF7A6'];

        BallsPreload(this, 80, 80, theme, gradient);
    }

    create() {
        const screenWidth = this.cameras.main.width;
        const screenHeight = this.cameras.main.height;
        const circleSize = 60;
        const radius = circleSize / 2;

        this.matter.world.setBounds(0, 0, screenWidth, screenHeight);

        this.circles = [];

        this.player = this.matter.add.circle(screenWidth / 2, screenHeight / 2, radius, {
            restitution: 0.8,
            friction: 0.1,
            inertia: Infinity,
        });

        this.playerSprite = this.add.sprite(this.player.position.x, this.player.position.y, 'ballsSpritesheet', 0);
        this.playerSprite.setOrigin(0.5, 0.5);
        this.playerSprite.setInteractive({ useHandCursor: true });

        this.trajectoryGraphics = this.add.graphics({ lineStyle: { width: 2, color: 0xff0000 } });
        this.isDragging = false;
        this.dragStart = { x: 0, y: 0 };

        this.input.on("pointerdown", (pointer) => {
            let dist = Phaser.Math.Distance.Between(pointer.x, pointer.y, this.player.position.x, this.player.position.y);
            if (dist < radius) {
                this.isDragging = true;
                this.dragStart.x = pointer.x;
                this.dragStart.y = pointer.y;
            }
        });

        this.input.on("pointerup", (pointer) => {
            if (this.isDragging) {
                this.isDragging = false;
                this.trajectoryGraphics.clear();
                let dx = this.dragStart.x - pointer.x;
                let dy = this.dragStart.y - pointer.y;
                let launchPower = 0.1;
                this.matter.body.setVelocity(this.player, { x: dx * launchPower, y: dy * launchPower });
            }
        });

        for (let i = 0; i < 5; i++) {
            let x = Phaser.Math.Between(circleSize, screenWidth - circleSize);
            let y = Phaser.Math.Between(circleSize, screenHeight - circleSize);

            let circle = this.matter.add.circle(x, y, radius, {
                restitution: 0.8,
                friction: 0.1,
                inertia: Infinity,
            });

            let ballIndex = (i % 5) + 1;
            let sprite = this.add.sprite(x, y, 'ballsSpritesheet', ballIndex);
            sprite.setOrigin(0.5, 0.5);
            this.matter.world.add(sprite);

            this.circles.push({ body: circle, graphics: sprite });

            sprite.setInteractive(new Phaser.Geom.Circle(x, y, radius), Phaser.Geom.Circle.Contains);
            sprite.on("pointerdown", () => {
                this.matter.body.setVelocity(circle, Phaser.Math.Between(-5, 5), Phaser.Math.Between(-5, 5));
            });
        }
    }

    update() {
        this.playerSprite.x = this.player.position.x;
        this.playerSprite.y = this.player.position.y;

        this.circles.forEach(({ body, graphics }) => {
            graphics.x = body.position.x;
            graphics.y = body.position.y;
        });

        if (this.isDragging) {
            let pointer = this.input.activePointer;
            let dx = this.dragStart.x - pointer.x;
            let dy = this.dragStart.y - pointer.y;
            let launchPower = 0.1;
            this.trajectoryGraphics.clear();
            this.drawTrajectory(dx * launchPower, dy * launchPower);
        }
    }

    drawTrajectory(velocityX, velocityY) {
        const trajectorySteps = 30;
        let startX = this.player.position.x;
        let startY = this.player.position.y;
        let stepX = velocityX;
        let stepY = velocityY;

        this.trajectoryGraphics.lineStyle(2, 0xff0000);
        this.trajectoryGraphics.beginPath();
        this.trajectoryGraphics.moveTo(startX, startY);

        for (let i = 0; i < trajectorySteps; i++) {
            startX += stepX;
            startY += stepY;
            stepX *= 0.99;
            stepY *= 0.99;
            this.trajectoryGraphics.lineTo(startX, startY);
        }

        this.trajectoryGraphics.strokePath();
    }
}
