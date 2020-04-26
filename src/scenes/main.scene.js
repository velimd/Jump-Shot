const { Scene, Input } = require('phaser');

const { KiBlast } = require('../ki-blast');

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
        this.physics.add.collider(this.player, this.platforms);
        // this.player.anims.play('idle');
        // player.body.setGravityY(300)

        this.projectiles = this.add.group();

        this.cameras.main.setBounds(0, 0, this.game.config.width * 2, this.game.config.height * 2);
        this.camera = this.cameras.main.startFollow(this.player)

        this.enemy = this.physics.add.sprite(1000, 0, 'mage').setScale(3);
        this.enemy.setBounce(0);
        this.enemy.anims.play('mage-idle');
        this.enemy.flipX=true;
        this.enemy.health = 5000;

        // this.enemy.setInteractive();
        // this.input.on('gameobjectdown', this.destroyEnemy, this);

        this.physics.add.collider(this.enemy, this.platforms);
        this.physics.add.overlap(this.projectiles, this.enemy, this.destroyEnemy, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE);
        this.keyZ = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.Z);
    }

    update() {
        this.background.tilePositionX = 0.5 * this.camera.scrollX;

        this.playerActions();        
    }

    playerActions() {
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-250);
            this.player.anims.play('jump');
        } else if (this.cursors.down.isDown && this.player.body.touching.down) {
            this.player.anims.play('crouch');
            this.player.setVelocityX(0);
        } 

        if (Input.Keyboard.JustDown(this.spacebar )) {
            this.player.anims.play('attack');
        } else if (Input.Keyboard.JustDown(this.keyZ)){
            this.player.anims.play('ki-blast-attack-motion');
            this.kiBlast();
        }

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.flipX = true
            this.player.anims.play('run', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.flipX = false
            this.player.anims.play('run', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('idle');
        }

        this.projectiles.getChildren().forEach(child => {
            child.update();
        })
    }

    destroyEnemy(pointer, gameObject) {
        gameObject.health -= 10;
        if (gameObject.health === 0) {
            gameObject.setTexture("explosion");
            gameObject.play("explode");
        }
    }

    kiBlast() {
        this.beam = new KiBlast(this)
    }
}