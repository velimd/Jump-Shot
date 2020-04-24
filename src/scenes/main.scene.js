import { Scene } from "phaser";

let background;
let player; 
let camera;
let cursors;

export class MainScene extends Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('background', 'assets/cyberpunk-street.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.spritesheet('dude', 
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    create() {
        let platforms;
        background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'background');
        background.setOrigin(0, 0);
        background.setScrollFactor(0);
        background.setScale(3.2);

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(5).refreshBody();

        player = this.physics.add.sprite(100, 450, 'dude');
        player.setBounce(0.2);

        this.cameras.main.setBounds(0, 0, this.game.config.width * 2, this.game.config.height * 2);
        camera = this.cameras.main.startFollow(player)

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        // player.body.setGravityY(300)
        this.physics.add.collider(player, platforms);
    }

    update() {
        background.tilePositionX = camera.scrollX * 0.4;
        cursors = this.input.keyboard.createCursorKeys();

        if (cursors.left.isDown) {
            player.setVelocityX(-160);
            player.anims.play('left', true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);
            player.anims.play('right', true);
        } else {
            player.setVelocityX(0);
            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-250);
        }
    }
}