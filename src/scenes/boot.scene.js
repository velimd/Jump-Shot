import { Scene } from 'phaser';

export class BootScene extends Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.image('background', 'assets/backgrounds/flat-night.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.spritesheet('dude', 
            'assets/adventurer-Sheet.png',
            { frameWidth: 50, frameHeight: 37 }
        );
        this.load.spritesheet('mage',
            'assets/enemy/mage.png',
            { frameWidth: 45, frameHeight: 51 }
        );
        this.load.spritesheet("explosion", "assets/explosion.png",{
            frameWidth: 16,
            frameHeight: 16
          });
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start('MainScene');
    }
}