class Boundary {
    static width = 64
    static height = 64
    constructor({position}) {
        this.position = position
        this.width = 64
        this.height = 64
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0.0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

// Sprite
class Sprite {
    constructor({ position, velocity, image, frames = { max: 1 }}) {
        this.position = position
        this.image = image
        this.frames = {...frames, row: 0, val: 0, elapsed: 0}

        this.image.onload = () => {
            this.width = this.image.width / 4
            this.height = this.image.height
        }
        this.moving = false
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
        this.sprites = options
        this.division = options
    }

    draw() {
        c.drawImage(
            this.image,
            this.frames.val * this.width, // crop position
            0, // crop position
            this.image.width / 4, // crop width
            this.image.height / this.division, // crop height
            this.position.x, // actual coordinates
            this.position.y,
            this.image.width * this.scale, // actual width and height, scaled
            this.image.height * this.scale
        );
        if(!this.moving) {
            this.division = 1
            return
        }

        console.log(this.division)

        if(this.frames.max > 1) {
            this.frames.elapsed++
        }

        if(this.frames.elapsed % 10 === 0) {
            if(this.frames.val < this.frames.max - 1) {
                this.frames.val++
            } else {
                this.frames.val = 0
                this.frames.row++
            }
        }
    }
}