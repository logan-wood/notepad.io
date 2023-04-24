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

const boundaries = []
const offset = {
    x: -1550,
    y: -1000
}

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


// Load in outside map image
const image = new Image();
image.src = './gameAssets/OutsideMap.png';

const foregroundImage = new Image();
foregroundImage.src = './gameAssets/foreground.png';

// Load in player image
const playerWalkImage = new Image();
playerWalkImage.src = './gameAssets/samuraiWalk.png';

const playerIdleImage = new Image();
playerIdleImage.src = './gameAssets/samuraiIdle.png';


const player = new PlayerSprite({
    position: {
        x: 400,
        y: 400
    },
    image: playerIdleImage,
    frames: {
        max: 4
    },
    scale: 0.9,
    sprites: 1,
    division: 1
})

const background = new Sprite({
    position: {
        x: -1550,
        y: -1000,
    },
    image: image
})

const foreground = new Sprite({
    position: {
        x: -1550,
        y: -1000,
    },
    image: foregroundImage
})

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

const movables = [background, ...boundaries, foreground]

function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x
        && rectangle1.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.position.y <= rectangle2.position.y + rectangle2.height
        && rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

function animate() {
    // infinite loop
    window.requestAnimationFrame(animate)

    // draw map and character here cause of infinite loop
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
    })

    //draw player
    player.draw()

    //draw foreground objects
    foreground.draw()

    let moving = true
    player.moving = false
    player.division = 1
    player.scale = 2
    player.image = playerIdleImage


    // handles sprite movement
    if(keys.w.pressed && lastKey === 'w') {
        player.moving = true
        player.scale = 1
        player.image = playerWalkImage
        player.division = 4

        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(
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
            ){
                moving = false
                break
            }
        }
        if(moving)
            movables.forEach((movable) => {
                movable.position.y += 3
            })
    } else if (keys.a.pressed && lastKey === 'a') {
        player.moving = true
        player.scale = 1
        player.image = playerWalkImage
        player.division = 4

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
        if(moving)
            movables.forEach((movable) => {
                movable.position.x += 3
            })
    } else if (keys.s.pressed && lastKey === 's') {
        player.moving = true
        player.scale = 1
        player.image = playerWalkImage
        player.division = 4

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
        if(moving)
            movables.forEach((movable) => {
                movable.position.y -= 3
            })
    } else if (keys.d.pressed && lastKey === 'd') {
        player.moving = true
        player.scale = 1
        player.image = playerWalkImage
        player.division = 4

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
        if(moving)
            movables.forEach((movable) => {
                movable.position.x -= 3
            })
    }
}
animate()

// gets what key was pressed
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