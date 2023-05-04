const monsters = {
    FireBook: {
        position: {
            x: 750,
            y: 50
        },
        image: {
            src: './gameAssets/firebook.png'
        },
        npcScale: 0.3,
        framesHeight: 1,
        isEnemy: true,
        name: 'Ignis',
        attacks: [attacks.Tackle, attacks.Fireball]
    },
    EarthBook: {
        position: {
            x: 200,
            y: 200
        },
        image: {
            src: './gameAssets/earthbook.png'
        },
        npcScale: 0.5,
        framesHeight: 1,
        name: 'Terra',
        attacks: [attacks.Tackle, attacks.Fireball]
    }
}