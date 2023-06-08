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

let earthBook
let chosenOne
let renderedSprites
let battleAnimationId
let queue = []

function randomSprites() {
    const random = Math.floor(Math.random() * 5) + 1;
    console.log(random)
    if(random === 1) {
        return new Monster(monsters.FireBook);
    } else if (random === 2) {
        return new Monster(monsters.WindBook);
    } else if (random === 3) {
        return new Monster(monsters.HealBook);
    } else if (random === 4) {
        return new Monster(monsters.WaterBook);
    } else if (random === 5) {
        return new Monster(monsters.ThunderBook);
    }
}

function initBattle() {
    document.querySelector('#userInterface').style.display = 'block';
    document.querySelector('#dialogueBox').style.display = 'none';
    document.querySelector('#enemyHealthBar').style.width = '100%';
    document.querySelector('#playerHealthBar').style.width = '100%';
    document.querySelector('#attacksBox').replaceChildren();
    document.querySelector('#points').style.display = 'none';

    earthBook = new Monster(monsters.EarthBook)

    console.log(chosenOne)
    chosenOne = randomSprites()
    const changeName = document.getElementById('enemyName');
    console.log(chosenOne.name);
    changeName.innerText = chosenOne.name;
    renderedSprites = [chosenOne, earthBook]
    queue = []

    earthBook.attacks.forEach((attack) => {
        const button = document.createElement('button')
        button.innerHTML = attack.name
        console.log(attack.name)
        document.querySelector('#attacksBox').append(button)
    })
    // our event listeners for our attack buttons
    document.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', (e) => {
            const selectedAttack = attacks[e.currentTarget.innerHTML]
            earthBook.attack({
                attack: selectedAttack,
                recipient: chosenOne,
                renderedSprites
            })

            if(chosenOne.health <= 0) {
                queue.push(() => {
                    chosenOne.faint()
                })
                queue.push(() => {
                    // fade back to black
                    gsap.to('#overlappingDiv', {
                        opacity: 1,
                        onComplete: () => {
                            cancelAnimationFrame(battleAnimationId)
                            // animate()
                            document.querySelector('#userInterface').style.display = 'none'

                            gsap.to('#overlappingDiv', {
                                opacity: 0
                            })

                            battle.initiated = false
                        }
                    })
                })
            }

            // firebook or earthbook attacks right here
            const randomAttack = chosenOne.attacks[Math.floor(Math.random() * chosenOne.attacks.length)]
            queue.push(() => {
                chosenOne.attack({
                    attack: randomAttack,
                    recipient: earthBook,
                    renderedSprites
                })
                if(earthBook.health <= 0) {
                    queue.push(() => {
                        earthBook.faint()
                    })

                    queue.push(() => {
                        // fade back to black
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            onComplete: () => {
                                cancelAnimationFrame(battleAnimationId)
                                // animate()
                                document.querySelector('#userInterface').style.display = 'none'

                                gsap.to('#overlappingDiv', {
                                    opacity: 0
                                })

                                battle.initiated = false
                            }
                        })
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
}

function animateBattle() {
    battleAnimationId = requestAnimationFrame(animateBattle)
    battleBackground.draw()

    console.log("entered battle mode")

    renderedSprites.forEach((sprite) => {
        console.log(sprite)
        sprite.draw()
    })
}
// animate()

document.querySelector('#dialogueBox').addEventListener('click', (e) => {
    if(queue.length > 0) {
        queue[0]()
        queue.shift()
    } else e.currentTarget.style.display = 'none'
})