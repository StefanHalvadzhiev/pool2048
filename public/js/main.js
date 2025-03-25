import { preload } from './preload.js';
import { create } from './create.js';
import { update } from './update.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: { preload, create, update }
};

const game = new Phaser.Game(config);
