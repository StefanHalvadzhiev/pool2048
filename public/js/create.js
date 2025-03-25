export function create() {
    this.logo = this.add.image(400, 300, 'logo');
    this.tweens.add({
        targets: this.logo,
        y: 500,
        duration: 2000,
        ease: 'Power2',
        yoyo: true,
        repeat: -1
    });
}
