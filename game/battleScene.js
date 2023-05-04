
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

const earthBookImage = new Image()
earthBookImage.src = './gameAssets/earthbook.png';
const earthBook = new Sprite({
    position: {
        x: 200,
        y: 200
    },
    image: earthBookImage,
    npcScale: 0.5,
    framesHeight: 1,
    name: 'Terra'
})

const fireBookImage = new Image()
fireBookImage.src = './gameAssets/firebook.png';
const fireBook = new Sprite({
    position: {
        x: 750,
        y: 50
    },
    image: fireBookImage,
    npcScale: 0.3,
    framesHeight: 1,
    isEnemy: true,
    name: 'Ignis'
})

let i = 0;
let direction = 1

const renderedSprites = [fireBook, earthBook]
function animateBattle() {
    window.requestAnimationFrame(animateBattle)
    console.log("entered battle mode")
    battleBackground.draw()
    renderedSprites.forEach((sprite) => {
        sprite.draw()
    })
}
// animate()
animateBattle()

// our event listeners for our attack buttons
document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (e) => {
        console.log(attacks[e.currentTarget.innerHTML])
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        fireBook.attack({
            attack: selectedAttack,
            recipient: earthBook,
            renderedSprites
        })
    })
})

document.querySelector('#dialogueBox').addEventListener('click', (e) => {
    e.currentTarget.style.display = 'none'
})