const canvas  = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Create canvas size
canvas.width = 1024;
canvas.height = 576;

const collisionMap = []
for(let i = 0; i < collisions.length; i += 64) {
    collisionMap.push(collisions.slice(i, i + 64))
}

class Boundary {
    static width = 64
    static height = 64
    constructor({position}) {
        this.position = position
        this.width = 64
        this.height = 64
    }

    draw() {
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
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

console.log(boundaries)

// Load in outside map image
const image = new Image();
image.src = './gameAssets/OutsideMap.png';

// Load in player image
const playerImage = new Image();
playerImage.src = './gameAssets/samurai.png';

// Sprite
class Sprite {
    constructor({ position, velocity, image, frames = { max: 1 }}) {
        this.position = position
        this.image = image
        this.frames = frames

        this.image.onload = () => {
            this.width = this.image.width / 4
            this.height = this.image.height
            console.log(this.width)
            console.log(this.height)
        }
    }

    draw() {
        c.drawImage(
            this.image,
            0, // crop position
            0, // crop position
            this.image.width / this.frames.max, // crop width
            this.image.height, // crop height
            this.position.x, // actual coordinates
            this.position.y,
            this.image.width / this.frames.max, // actual width and height
            this.image.height
        )
    }
}

// Player sprite
class PlayerSprite extends Sprite {
    constructor(options) {
        super(options);
        this.scale = options.scale || 1;
    }

    draw() {
        c.drawImage(
            this.image,
            0, // crop position
            0, // crop position
            this.image.width / 4, // crop width
            this.image.height / 7, // crop height
            this.position.x, // actual coordinates
            this.position.y,
            this.image.width * this.scale, // actual width and height, scaled
            this.image.height * this.scale
        );
    }
}

const player = new PlayerSprite({
    position: {
        x: 400,
        y: 300
    },
    image: playerImage,
    frames: {
        max: 4
    },
    scale: 0.9
})

const background = new Sprite({
    position: {
        x: -1550,
        y: -1000,
    },
    image: image
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

const movables = [background, ...boundaries]

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
        if(
            rectangularCollision({
                rectangle1: player,
                rectangle2: boundary
            })
        ) {
            console.log('colliding')
        }
    })
    player.draw()

    if(keys.w.pressed && lastKey === 'w') {
        movables.forEach((movable) => {
            movable.position.y += 3
        })
    }
    else if (keys.a.pressed && lastKey === 'a') {
        movables.forEach((movable) => {
            movable.position.x += 3
        })
    }
    else if (keys.s.pressed && lastKey === 's') {
        movables.forEach((movable) => {
            movable.position.y -= 3
        })
    }
    else if (keys.d.pressed && lastKey === 'd') {
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