// Boundary class
class Boundary {
    static width = 64
    static height = 64
    constructor({position}) {
        this.position = position
        this.width = 64
        this.height = 64
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0.1)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

// Sprite class for map and player
class Sprite {
    constructor({ position, velocity, image, frames = { max: 1 }, framesHeight, sprites, npcScale}) {
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0}
        this.framesHeight = framesHeight
        this.npcScale = npcScale

        this.image.onload = () => {
            this.width = this.image.width / 4
            this.height = this.image.height
        }
        this.moving = false
        this.sprites = sprites
    }

    draw() {
        c.drawImage(
            this.image,
            this.frames.val * this.width, // crop position
            0, // crop position
            this.image.width / this.frames.max, // crop width
            this.image.height / this.framesHeight, // crop height
            this.position.x, // actual coordinates
            this.position.y,
            (this.image.width * this.npcScale) / this.frames.max, // actual width and height
            (this.image.height * this.npcScale)  / this.framesHeight
        )

        if(this.npcScale === 3) {
            c.drawImage(
            this.image,
            this.frames.val * this.width, // crop position
                (this.image.height / 7) * 6, // crop position
            this.image.width / this.frames.max, // crop width
            this.image.height / this.framesHeight, // crop height
                this.position.x, // actual coordinates
                this.position.y,
            (this.image.width * this.npcScale) / this.frames.max, // actual width and height
            (this.image.height * this.npcScale)  / this.framesHeight
            )
            if(this.frames.max > 1) {
                this.frames.elapsed++
            }

            if(this.frames.elapsed % 60 === 0) {
                if(this.frames.val < this.frames.max - 1) this.frames.val++
                else this.frames.val = 0
            }
        }

        if(!this.moving) return

        if(this.frames.max > 1) {
            this.frames.elapsed++
        }

        if(this.frames.elapsed % 10 === 0) {
            if(this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        }
    }
}