// http://127.0.0.1:8887/index.html

const canvas  = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Create canvas size
canvas.width = 1024;
canvas.height = 576;

const collisionMap = []
for(let i = 0; i < collisions.length; i += 64) {
    collisionMap.push(collisions.slice(i, i + 64))
}

const battleFoxMap = []
for(let i = 0; i < battleFoxData.length; i += 64) {
    battleFoxMap.push(battleFoxData.slice(i, i + 64))
}

// set boundary coordinates
const boundaries = []
const offset = {
    x: -1550,
    y: -1000
}

const minX = offset.x;
const minY = offset.y;

// set collisions onto map
collisionMap.forEach((row, i) => {
    row.forEach((symbol, j)  => {
        if(symbol === 551)
        boundaries.push(
            new Boundary({
            position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
            }
        })
        )
    })
})

const battleZones = []
battleFoxMap.forEach((row, i) => {
    row.forEach((symbol, j)  => {
        if(symbol === 551)
            battleZones.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
    })
})

// Load in outside map image
const image = new Image();
image.src = './gameAssets/OutsideMap.png';

// Load in foreground map image
const foregroundImage = new Image();
foregroundImage.src = './gameAssets/foreground.png';

// Load in player DOWN image
const playerDownImage = new Image();
playerDownImage.src = './gameAssets/playerDown.png';

// Load in player UP sprite
const playerUpImage = new Image();
playerUpImage.src = './gameAssets/playerUp.png';

// Load in player LEFT sprite
const playerLeftImage = new Image();
playerLeftImage.src = './gameAssets/playerLeft.png';

// Load in player RIGHT sprite
const playerRightImage = new Image();
playerRightImage.src = './gameAssets/playerRight.png';

const npcImage = new Image();
npcImage.src = './gameAssets/dogNinja.png';

// Create player sprite
const player = new Sprite({
    position: {
        x: 400,
        y: 400
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    framesHeight: 1,
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        down: playerDownImage,
        right: playerRightImage
    },
    npcScale: 1
})

// set background image coordinates
const background = new Sprite({
    position: {
        x: -1550,
        y: -1000,
    },
    image: image,
    framesHeight: 1,
    npcScale: 1
})

const npc = new Sprite( {
    position: {
        x: 670,
        y: 310
    },
    image: npcImage,
    frames: {
        max: 4
    },
    framesHeight: 7,
    npcScale: 3
})

// set foreground image coordinates
const foreground = new Sprite({
    position: {
        x: -1550,
        y: -1000,
    },
    image: foregroundImage
})

// which key is pressed
const keys ={
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

// movable objects
const movables = [background, ...boundaries, foreground, npc, ...battleZones]

// collision bounds set
function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x
        && rectangle1.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.position.y <= rectangle2.position.y + rectangle2.height
        && rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

// animation loop that controls movement of the sprite and map
function animate() {
    // infinite loop
    window.requestAnimationFrame(animate)

    // draw map and character here cause of infinite loop
    background.draw()
    boundaries.forEach(boundary => {
            boundary.draw()
        })
     battleZones.forEach(battleZone => {
         battleZone.draw()
         })

    npc.draw()

    //draw player
    player.draw()

    //draw foreground objects
    foreground.draw()

    let moving = true
    player.moving = false

    // handles sprite movement
    if(keys.w.pressed && lastKey === 'w') {
        player.moving = true
        player.image = player.sprites.up

        // check if player has collided with border
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }
        // checks whether camera has reached border of map
        if (movables[0].position.y <= 0)  {

            // moves the background, barriers and foreground if player is moving
            if (moving)
                movables.forEach((movable) => {
                    movable.position.y += 3
                })
        } else {

            // move character instead of map
            if(moving) player.position.y -= 3
        }
    } else if (keys.a.pressed && lastKey === 'a') {
        player.moving = true
        player.image = player.sprites.left

        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x + 3,
                            y: boundary.position.y
                        }
                    }
                })
            ){
                moving = false
                break
            }
        }
        if (movables[0].position.x <= 0)  {
            if(moving)
                movables.forEach((movable) => {
                    movable.position.x += 3
                })
        } else {
            if(moving) player.position.x -= 3
        }

    } else if (keys.s.pressed && lastKey === 's') {
        player.moving = true
        player.image = player.sprites.down

        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 3
                        }
                    }
                })
            ){
                moving = false
                break
            }
        }
        if (movables[0].position.y >= -1700)  {
            if(moving)
                movables.forEach((movable) => {
                    movable.position.y -= 3
                })
        } else {
            if(moving) player.position.y += 3
        }
    } else if (keys.d.pressed && lastKey === 'd') {
        player.moving = true
        player.image = player.sprites.right

        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x - 3,
                            y: boundary.position.y
                        }
                    }
                })
            ){
                moving = false
                break
            }
        }
        if (movables[0].position.x > (minX + minX) + 50 )  {
            if(moving)
                movables.forEach((movable) => {
                    movable.position.x -= 3
                })
        } else {
            if(moving) player.position.x += 3
        }
    }
}
animate()

// key down event listener
let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})

// Key up event listener
window.addEventListener('keyup', (e) => {
    switch(e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})