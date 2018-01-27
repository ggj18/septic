function preload() {

    game.load.image('stars', 'assets/misc/starfield.jpg');
    game.load.image('cell', 'assets/sprites/shinyball.png');
    game.load.image('redCell', 'assets/sprites/redBloodCell.png');
    game.load.image('firstaid', 'assets/sprites/firstaid.png');
    game.load.spritesheet('virus', 'assets/sprites/virus01.png');

    game.load.image('background', 'assets/tilemaps/BGparallax01.png');
    game.load.image('workaround', 'assets/sprites/super-workaround.png');

    game.load.physics('physicsData', 'assets/physics/background-physics.json');
}
