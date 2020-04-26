const { Scene } = require('phaser');

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
        this.load.spritesheet("ki-blast", "assets/ki-blast.png",{
            frameWidth: 16,
            frameHeight: 16
        });
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start('MainScene');

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'mage-idle',
            frames: this.anims.generateFrameNumbers('mage', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('dude', { start: 8, end: 13 }),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('dude'),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'crouch',
            frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 7}),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true
        });

        this.anims.create({
            key: "attack",
            frames: this.anims.generateFrameNumbers("dude", { start: 45, end: 51 }),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: "ki-blast-attack",
            frames: this.anims.generateFrameNumbers("ki-blast"),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "ki-blast-attack-motion",
            frames: this.anims.generateFrameNumbers("dude", { start: 35, end: 37 }),
            frameRate: 10,
            repeat: 0
        });
    }
}