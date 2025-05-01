function BallsPreload(scene, w, h, theme, gradient) {
    const totalBalls = theme.numberOfGeneratedBalls + 1;
    const ballCanvas = document.createElement('canvas');
    ballCanvas.width = w * totalBalls;
    ballCanvas.height = h;

    const ctx = ballCanvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(w / 2, h / 2, theme.ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = theme.numeratedDefaultBallFillStyle;
    ctx.strokeStyle = theme.numeratedDefaultBallStrokeStyle;
    ctx.lineWidth = theme.numeratedDefaultBallStrokeWidth;
    ctx.fill();
    ctx.stroke();

    let center = w / 2 + w;

    for (let i = 1; i <= theme.numberOfGeneratedBalls; i++) {
        ctx.beginPath();
        ctx.arc(center, h / 2, theme.ballRadius, 0, 2 * Math.PI);

        ctx.fillStyle = gradient[i] || '#000000';
        ctx.strokeStyle = theme.numeratedBallsStrokeStyle;
        ctx.lineWidth = theme.numeratedBallsStrokeWidth;
        ctx.fill();
        ctx.stroke();

        ctx.font = `${theme.numeratedBallsFontSize} ${theme.numeratedBallsFont}`;
        ctx.textAlign = theme.numeratedBallsTextAlign;
        ctx.textBaseline = theme.numeratedBallsTextBaseline;

        ctx.fillStyle = i < 3
            ? theme.numeratedBallsFontColorBelowBallThree
            : (i < gradient.length ? theme.numeratedBallsFontColorAboveBallThree : '#ffffff');

        const number = Math.pow(2, i);
        ctx.fillText(`${number}`, center, h / 2);

        center += w;
    }

    scene.textures.addSpriteSheet('ballsSpritesheet', ballCanvas, {
        frameWidth: w,
        frameHeight: h,
        startFrame: 0,
        endFrame: totalBalls - 1
    });
}
const gradient = ['#FF5733', '#C70039', '#900C3F', '#581845', '#DAF7A6'];
