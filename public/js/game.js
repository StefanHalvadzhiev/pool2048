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

        this.isDragging = false;
        this.startDragX = 0;
        this.startDragY = 0;
        this.lineGraphics = this.add.graphics({ lineStyle: { width: 4, color: 0xff0000 } });

        this.playerGraphics.setInteractive(new Phaser.Geom.Circle(this.player.position.x, this.player.position.y, circleSize / 2,), Phaser.Geom.Circle.Contains);

        this.input.on("pointerdown", (pointer) => {
            let dist = Phaser.Math.Distance.Between(pointer.x, pointer.y, this.player.position.x, this.player.position.y);
            if (dist < circleSize / 2) {
                this.isDragging = true;
                this.startDragX = pointer.x;
                this.startDragY = pointer.y;
            }
        });

        this.input.on("pointermove", (pointer) => {
            if (this.isDragging) {
                this.lineGraphics.clear();
                this.lineGraphics.lineBetween(this.player.position.x, this.player.position.y, pointer.x, pointer.y);
            }
        });

        this.input.on("pointerup", (pointer) => {
            if (this.isDragging) {
                this.isDragging = false;
                this.lineGraphics.clear();

                let dx = this.startDragX - pointer.x;
                let dy = this.startDragY - pointer.y;
                let launchPower = 0.1;
                this.matter.body.setVelocity(this.player, { x: dx * launchPower, y: dy * launchPower });
            }
        });

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
    }

    update() {
        this.playerGraphics.x = this.player.position.x;
        this.playerGraphics.y = this.player.position.y;class GameScene extends Phaser.Scene {
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
        
                this.trajectoryGraphics = this.add.graphics({ lineStyle: { width: 2, color: 0xff0000 } });
                this.isDragging = false;
                this.startDragX = 0;
                this.startDragY = 0;
        
                this.playerGraphics.setInteractive(new Phaser.Geom.Circle(this.player.position.x, this.player.position.y, circleSize / 2), Phaser.Geom.Circle.Contains);
        
                this.input.on("pointerdown", (pointer) => {
                    let dist = Phaser.Math.Distance.Between(pointer.x, pointer.y, this.player.position.x, this.player.position.y);
                    if (dist < circleSize / 2) {
                        this.isDragging = true;
                        this.startDragX = pointer.x;
                        this.startDragY = pointer.y;
                    }
                });
        
                this.input.on("pointermove", (pointer) => {
                    if (this.isDragging) {
                        this.trajectoryGraphics.clear();

                        this.trajectoryGraphics.lineBetween(this.player.position.x, this.player.position.y, pointer.x, pointer.y);
                    }
                });
        
                this.input.on("pointerup", (pointer) => {
                    if (this.isDragging) {
                        this.isDragging = false;
                        this.trajectoryGraphics.clear();
        
                        let dx = this.startDragX - pointer.x;
                        let dy = this.startDragY - pointer.y;
                        let launchPower = 0.1;
        
                        this.matter.body.setVelocity(this.player, { x: dx * launchPower, y: dy * launchPower });
        
                        this.drawTrajectory(dx * launchPower, dy * launchPower);
                    }
                });
        
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
            }
        
            drawTrajectory(velocityX, velocityY) {
                const trajectorySteps = 30;
                let startX = this.player.position.x;
                let startY = this.player.position.y;
                let stepX = velocityX;
                let stepY = velocityY;
        
                this.trajectoryGraphics.lineStyle(2, 0xff0000);
                this.trajectoryGraphics.moveTo(startX, startY);
        
                for (let i = 0; i < trajectorySteps; i++) {
                    startX += stepX;
                    startY += stepY;
                    stepX *= 0.99; // Reduce the velocity over time to simulate friction
                    stepY *= 0.99; // Reduce the velocity over time to simulate friction
                    this.trajectoryGraphics.lineTo(startX, startY);
                }
        
                this.trajectoryGraphics.strokePath();
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
        

        this.circles.forEach(({ body, graphics }) => {
            graphics.x = body.position.x;
            graphics.y = body.position.y;
        });
    }
}
