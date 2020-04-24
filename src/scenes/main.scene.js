import { Scene } from 'phaser';

export class MainScene extends Scene {
    constructor() {
        super('MainScene');
    }

    create() {
        this.background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'background');
        this.background.setOrigin(0, 0);
        this.background.setScrollFactor(0);

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(5).refreshBody();

        this.player = this.physics.add.sprite(100, 450, 'dude').setScale(2);
        this.player.setBounce(0);
        // player.body.setCollideWorldBounds(true);

        this.enemy = this.physics.add.sprite(1000, 0, 'mage').setScale(3);
        this.enemy.setBounce(0);

        this.cameras.main.setBounds(0, 0, this.game.config.width * 2, this.game.config.height * 2);
        this.camera = this.cameras.main.startFollow(this.player)

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

        // this.player.anims.play('idle');
        // player.body.setGravityY(300)
        this.physics.add.collider(this.player, this.platforms);

        this.enemy.anims.play('mage-idle');
        this.enemy.flipX=true;

        this.enemy.setInteractive();

        this.input.on('gameobjectdown', this.destroyEnemy, this);

        this.physics.add.collider(this.enemy, this.platforms);

        this.physics.add.overlap(this.player, this.enemy, this.destroyEnemy, null, this);
    }

    update() {
        this.background.tilePositionX = this.camera.scrollX * 0.4;
        const cursors = this.input.keyboard.createCursorKeys();

        if (cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.flipX = true
            this.player.anims.play('run', true);
        } else if (cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.flipX = false
            this.player.anims.play('run', true);
        } else if (cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-250);
            this.player.anims.play('jump');
        } else if (cursors.down.isDown && this.player.body.touching.down && this.player.body.velocity.x === 0) {
            this.player.anims.play('crouch');
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('idle');
        }
    }

    destroyEnemy(pointer, gameObject) {
        gameObject.setTexture("explosion");
        gameObject.play("explode");
    }
}