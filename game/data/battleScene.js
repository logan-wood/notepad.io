
const battleBackgroundImage = new Image()
battleBackgroundImage.src = './gameAssets/battleBackground.png';
const battleBackground = new Sprite({
    position: {
        x:0,
        y:0
    },
    image: battleBackgroundImage,
    npcScale: 1,
    framesHeight: 1
})

const earthBook = new Monster(monsters.EarthBook)
const fireBook = new Monster(monsters.FireBook)

const renderedSprites = [fireBook, earthBook]

earthBook.attacks.forEach((attack) => {
    const button = document.createElement('button')
    button.innerHTML = attack.name
    console.log(attack.name)
    document.querySelector('#attacksBox').append(button)
})

let battleAnimationId
function animateBattle() {
    battleAnimationId = requestAnimationFrame(animateBattle)
    window.requestAnimationFrame(animateBattle)
    console.log("entered battle mode")
    battleBackground.draw()

    renderedSprites.forEach((sprite) => {
        sprite.draw()
    })
}
// animate()
animateBattle()

const queue = []

// our event listeners for our attack buttons
document.querySelectorAll('button').forEach((button) => {

    button.addEventListener('click', (e) => {
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        earthBook.attack({
            attack: selectedAttack,
            recipient: fireBook,
            renderedSprites
        })

        if(fireBook.health <= 0) {
            queue.push(() => {
                fireBook.faint()
            })
            queue.push(() => {
                // fade back to black
                // gsap.to('#overlappingDiv', {
                //     opacity: 1,
                //     onComplete: () => {
                //         cancelAnimationFrame(battleAnimationId)
                //         animate()
                //         gsap.to('#overlappingDiv', {
                //             opacity: 0
                //         })
                //     }
                // })
            })
        }

        // firebook or earthbook attacks right here
        const randomAttack = fireBook.attacks[Math.floor(Math.random() * fireBook.attacks.length)]
        queue.push(() => {
            fireBook.attack({
                attack: randomAttack,
                recipient: earthBook,
                renderedSprites
            })
            if(earthBook.health <= 0) {
                queue.push(() => {
                    earthBook.faint()
                })
            }
        })
    })

    button.addEventListener('mouseenter', (e) => {
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        document.querySelector('#attackType').innerHTML = selectedAttack.type
        document.querySelector('#attackType').style.color = selectedAttack.color
    })
})

document.querySelector('#dialogueBox').addEventListener('click', (e) => {
    if(queue.length > 0) {
        queue[0]()
        queue.shift()
    } else e.currentTarget.style.display = 'none'
})