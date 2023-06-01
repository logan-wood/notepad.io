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

const entranceMap = []
for(let i = 0; i < entrance.length; i += 64) {
    entranceMap.push(entrance.slice(i, i + 64))
}

// set boundary coordinates
const offset = {
    x: -1550,
    y: -1000
}
const minX = offset.x;

const minY = offset.y;

// set collisions onto map
const boundaries = []
collisionMap.forEach((row, i) => {
    row.forEach((symbol, j)  => {
        if(symbol === 551)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                }))
    })
})

// set Battle zone onto the map
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
                }))
    })
})

const entrances = []
entranceMap.forEach((row, i) => {
    row.forEach((symbol, j)  => {
        if(symbol === 2165) {
            entrances.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                }))
        }
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
        max: 4,
        hold: 10
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
        y: -1000
    },
    image: image,
    framesHeight: 1,
    npcScale: 1
})

// set foreground image coordinates
const foreground = new Sprite({
    position: {
        x: -1550,
        y: -1000,
    },
    image: foregroundImage,
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
    },
    esc: {
        pressed: false
    }
}

// movable objects
let movables = [background, foreground, npc]

// collision bounds set
function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x
        && rectangle1.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.position.y <= rectangle2.position.y + rectangle2.height
        && rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

const battle = {
    initiated: false
}

const inside = {
    initiated: false
}

let outsideBoundaries = false
let outsideBattleZones = false
let outsideEntrance = false

// returns whether function was added to movable
function drawCollisions(collisionMap, boundaries, containsBoundaries) {
    boundaries.forEach(boundary => {
        boundary.draw()
    })

    if(!containsBoundaries) {
        movables.push(...boundaries)

        containsBoundaries = true
        return containsBoundaries
    }
    return containsBoundaries
}

let animationId = null
let playerStartPosition = { x: 0, y: 0 };
// let user


// animation loop that controls movement of the sprite and map
function animate() {
    setTimeout(function() {
        displayPoints()
    }, 1000)
    window.requestAnimationFrame(animate)

    if(keys.esc.pressed) {
        document.querySelector('#menuDiv').style.display = 'block'
    } else if(!keys.esc.pressed) {
        document.querySelector('#menuDiv').style.display = 'none'
    }

    // draw map and character here cause of infinite loop
    background.draw();

    outsideBoundaries = drawCollisions(collisionMap, boundaries, outsideBoundaries);
    outsideBattleZones = drawCollisions(battleFoxMap, battleZones, outsideBattleZones);
    outsideEntrance = drawCollisions(entranceMap, entrances, outsideEntrance);

    npc.draw();

    //draw player
    player.draw();

    //draw foreground objects
    foreground.draw();

    // check how many points they have


    let moving = true;
    player.animate = false;

    if(inside.initiated) return;
    if(battle.initiated) return;

    // activate battle
    if((keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed)) {
        for (let i = 0; i < entrances.length; i++) {
            const entranceCollisions = entrances[i];

            if (rectangularCollision({rectangle1: player, rectangle2: entranceCollisions})
                && keys.w.pressed) {

                window.cancelAnimationFrame(animationId)

                inside.initiated = true
                gsap.to('#insideMap', {
                    opacity: 1,
                    yoyo: true,
                    onComplete() {
                        gsap.to('#insideMap', {
                            opacity: 0,
                            onComplete() {
                                insideHouse();
                                playerStartPosition = { x: player.position.x, y: player.position.y };


                                inside.initiated = true
                            }
                        })
                    }
                })
            }
        }
        // check for battle zone collision
        for (let i = 0; i < battleZones.length; i++) {
            const battleZone = battleZones[i]
            if (rectangularCollision({ rectangle1: player, rectangle2: battleZone}) && Math.random() < 0.01) {

                // deactivate current animation loop
                window.cancelAnimationFrame(animationId)

                battle.initiated = true
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete() {
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            duration: 0.4,
                            onComplete() {
                                // activate new animation loop
                                initBattle()
                                animateBattle()
                                gsap.to('#overlappingDiv', {
                                    opacity: 0,
                                    duration: 0.4
                                })
                            }
                        })
                    }
                })
                break
            }
        }
    }
    movement(moving, boundaries, !inside.initiated)
}
animate()

addEventListener('click', () => {
    // console.log('clicked')
})

function movement(moving, boundaries, notInside) {
    // handles sprite movement
    if(keys.w.pressed && lastKey === 'w') {
        player.animate = true
        player.image = player.sprites.up

        // check for boundary collisions
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({rectangle1: player, rectangle2: {...boundary, position: {x: boundary.position.x, y: boundary.position.y + 3}}})) {
                moving = false
                break
            }
        }

        // checks whether camera has reached border of map
        if (movables[0].position.y <= 0 && notInside)  {
            // moves the background, barriers and foreground if player is moving
            if (moving)
                movables.forEach((movable) => {
                    movable.position.y += 3
                })
        } else if(!notInside){
            if(moving)
                movables.forEach((movable) => {
                    movable.position.y += 3
                })
        } else {

            // move character instead of map
            if(moving) player.position.y -= 3
        }
    } else if (keys.a.pressed && lastKey === 'a') {
        player.animate = true
        player.image = player.sprites.left

        // check for boundary collisions
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(rectangularCollision({rectangle1: player, rectangle2: {...boundary, position: {x: boundary.position.x + 3, y: boundary.position.y}}})){
                moving = false
                break
            }
        }

        if (movables[0].position.x <= 0 && notInside)  {
            if(moving)
                movables.forEach((movable) => {
                    movable.position.x += 3
                })
        } else if(!notInside){
            if(moving)
                movables.forEach((movable) => {
                    movable.position.x += 3
                })
        } else {
            if(moving) player.position.x -= 3
        }
    } else if (keys.s.pressed && lastKey === 's') {
        player.animate = true
        player.image = player.sprites.down

        // check for boundary collisions
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(rectangularCollision({ rectangle1: player, rectangle2: { ...boundary, position: {x: boundary.position.x, y: boundary.position.y - 3}}})){
                moving = false
                break
            }
        }

        if (movables[0].position.y >= -1700 && notInside)  {
            if(moving)
                movables.forEach((movable) => {
                    movable.position.y -= 3
                })
        } else if(!notInside){
            if(moving)
                movables.forEach((movable) => {
                    movable.position.y -= 3
                })
        } else {
            if(moving) player.position.y += 3
        }
    } else if (keys.d.pressed && lastKey === 'd') {
        player.animate = true
        player.image = player.sprites.right

        // check for boundary collisions
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(rectangularCollision({rectangle1: player, rectangle2: {...boundary, position: {x: boundary.position.x - 3, y: boundary.position.y}}})){
                moving = false
                break
            }
        }

        if (movables[0].position.x > (minX + minX) + 50 && notInside)  {
            if(moving)
                movables.forEach((movable) => {
                    movable.position.x -= 3
                })
        } else if(!notInside){
            if(moving)
                movables.forEach((movable) => {
                    movable.position.x -= 3
                })
        } else {
            if(moving) player.position.x += 3
        }
    }
}
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
        case 'Escape':
            if(keys.esc.pressed) {
                keys.esc.pressed = false
            } else if (!keys.esc.pressed) {
                keys.esc.pressed = true
            }
            lastKey = 'esc'
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