const Phaser = require('phaser');

const { BootScene } = require('./scenes/boot.scene');
const { MainScene } = require('./scenes/main.scene');


// Need to config it so it can be used in scenes
// const gameSettings = {
//     playerRunSpeed: 160,
//     playerJumpSpeed: 250
// }

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [BootScene, MainScene]
};

const game = new Phaser.Game(config);