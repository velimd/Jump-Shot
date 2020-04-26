const { Sprite } = require('phaser').GameObjects

export class KiBlast extends Sprite {
    constructor(scene) {
        const x = scene.player.x + 20;
        const y = scene.player.y;
        super(scene, x, y, 'ki-blast');

        scene.add.existing(this);
        this.setAngle(90);
        this.setScale(3);
        
        this.play('ki-blast-attack');
        scene.physics.world.enableBody(this);
        this.body.velocity.x = 500;
        this.body.allowGravity = false;

        scene.projectiles.add(this);
        this.reach = scene.player.x + (scene.game.config.width / 2) - 100 ;
    }

    update() {
        if(this.x > this.reach){
            this.destroy();
        }
    }
}