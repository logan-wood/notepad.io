// Sprite class for map and player
class Sprite {
    constructor({ position, velocity, image, frames = { max: 1, hold: 10 }, framesHeight, sprites, animate = false, npcScale, isEnemy = false, rotation = 0}) {
        this.position = position
        this.image = image
        this.image = new Image()
        this.frames = {...frames, val: 0, elapsed: 0}
        this.image.onload = () => {
            this.width = this.image.width / 4
            this.height = this.image.height
        }
        this.image.src = image.src

        this.framesHeight = framesHeight
        this.npcScale = npcScale
        this.animate = animate
        this.sprites = sprites
        this.opacity = 1
        this.rotation = rotation
    }

    draw() {
        c.save()
        c.translate(this.position.x + this.width / 2, this.position.y + this.height / 2)
        c.rotate(this.rotation)
        c.translate(-this.position.x - this.width / 2, -this.position.y - this.height / 2)
        c.globalAlpha = this.opacity
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
        c.restore()

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

        if(!this.animate) return

        if(this.frames.max > 1) {
            this.frames.elapsed++
        }

        console.log(this.frames.hold)
        if(this.frames.elapsed % this.frames.hold === 0) {
            if(this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        }
    }
}

class Monster extends Sprite {
    constructor({
        position,
        velocity,
        image,
        frames = { max: 1, hold: 10 },
        framesHeight, sprites,
        animate = false,
        npcScale,
        isEnemy = false,
        rotation = 0,
        name,
        attacks
    }) {
        super({
            position,
            velocity,
            image,
            frames,
            framesHeight, sprites,
            animate,
            npcScale,
            isEnemy,
            rotation,
            name
        })
        this.health = 100
        this.isEnemy = isEnemy
        this.name = name
        this.attacks = attacks
    }

    faint() {
        document.querySelector('#dialogueBox').innerHTML = this.name + ' fainted!'
        gsap.to(this.position, {
            y: this.position.y + 20
        })
        gsap.to(this, {
            opacity: 0
        })
    }

    attack({attack, recipient, renderedSprites}) {
        document.querySelector('#dialogueBox').style.display = 'block'
        document.querySelector('#dialogueBox').innerHTML = this.name + ' used ' + attack.name

        let healthBar = '#enemyHealthBar'
        if(this.isEnemy) healthBar = '#playerHealthBar'

        let rotation = 1
        if(this.isEnemy) rotation = -2

        recipient.health -= attack.damage

        switch (attack.name) {
            case 'Fireball':
                const fireballImage = new Image()
                fireballImage.src = './gameAssets/fireball.png'
                const fireball = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: fireballImage,
                    framesHeight: 1,
                    npcScale: 1,
                    frames: {
                        max: 4,
                        hold: 10
                    },
                    animate: true,
                    rotation
                })
                renderedSprites.splice(1, 0, fireball)

                gsap.to(fireball.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () => {
                        gsap.to(healthBar, {
                            width: recipient.health + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08,
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                        renderedSprites.splice(1, 1)
                    }
                })


                break
            case 'Tackle' :
                const tl = gsap.timeline()

                let movementDistance = 20

                if(this.isEnemy) movementDistance = -20

                tl.to(this.position, {
                    x: this.position.x - movementDistance
                }).to(this.position, {
                    x: this.position.x + movementDistance * 2,
                    duration: 0.1,
                    onComplete: () => {
                        gsap.to(healthBar, {
                            width: recipient.health + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08,
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                }).to(this.position, {
                    x: this.position.x
                })
                break
        }
    }
}

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
        c.fillStyle = 'rgba(255, 0, 0, 1)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}