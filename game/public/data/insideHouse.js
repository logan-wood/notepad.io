const insideMapImage = new Image()
insideMapImage.src = './gameAssets/indoorMap1.png'

const insideMapBackground = new Sprite({
    position: {
        x: -2300,
        y: -2800
    },
    image: insideMapImage,
    npcScale: 1,
    framesHeight: 1
})

const insideOffset = {
    x: -1550,
    y: -1000
}

const insideCollisionMap = []
for(let i = 0; i < indoorCollisions.length; i += 70) {
    insideCollisionMap.push(indoorCollisions.slice(i, i + 70))
}

const exitMap = []
for(let i = 0; i < exit.length; i += 70) {
    exitMap.push(exit.slice(i, i + 70))
}

const insideBoundaries = []
insideCollisionMap.forEach((row, i) => {
    row.forEach((symbol, j)  => {
        if(symbol === 1887)
            insideBoundaries.push( new Boundary({
                position: {
                    x: j * Boundary.width - 1730,
                    y: i * Boundary.height - 1840
                }
            }))
    })
})

const exits = []
exitMap.forEach((row, i) => {
    row.forEach((symbol, j)  => {
        if(symbol === 1887)
            exits.push( new Boundary({
                position: {
                    x: j * Boundary.width - 1730,
                    y: i * Boundary.height - 1840
                }
            }))
    })
})

movables = [...movables, insideMapBackground]

function initInsideHouse() {

    const insideID = window.requestAnimationFrame(initInsideHouse)

    insideMapBackground.draw()

/*    insideBoundaries.forEach(insideCollision => {
        insideCollision.draw()
    })*/

    drawCollisions(insideCollisionMap, insideBoundaries)

    player.draw()
    player.position.x = 480
    player.position.y = 250

    let moving = true
    player.animate = false

    if(keys.esc.pressed) {
        console.log(keys.esc.pressed)
        const menu = document.querySelector('#menuDiv').style.display = 'block'
    } else if(!keys.esc.pressed) {
        const menu = document.querySelector('#menuDiv').style.display = 'none'
    }

    if((keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed)) {
        for (let i = 0; i < exits.length; i++) {
            const exitCollisions = exits[i]
            if(rectangularCollision({rectangle1: player, rectangle2: exitCollisions})) {
                // transition back to original map
            }
        }
    }

    movement(moving, insideBoundaries, false)
}