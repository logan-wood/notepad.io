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
    },
    HealBook: {
        position: {
            x: 750,
            y: 50
        },
        image: {
            src: './gameAssets/healerbook.png'
        },
        npcScale: 0.3,
        framesHeight: 1,
        isEnemy: true,
        name: 'Sana',
        attacks: [attacks.Tackle, attacks.Fireball]
    },
    ThunderBook: {
        position: {
            x: 750,
            y: 50
        },
        image: {
            src: './gameAssets/thunderbook.png'
        },
        npcScale: 0.3,
        framesHeight: 1,
        isEnemy: true,
        name: 'Tonitruum',
        attacks: [attacks.Tackle, attacks.Fireball]
    },
    WaterBook: {
        position: {
            x: 750,
            y: 50
        },
        image: {
            src: './gameAssets/waterbook.png'
        },
        npcScale: 0.3,
        framesHeight: 1,
        isEnemy: true,
        name: 'Aqua',
        attacks: [attacks.Tackle, attacks.Fireball]
    },
    WindBook: {
        position: {
            x: 750,
            y: 50
        },
        image: {
            src: './gameAssets/windbook.png'
        },
        npcScale: 0.3,
        framesHeight: 1,
        isEnemy: true,
        name: 'Ventus',
        attacks: [attacks.Tackle, attacks.Fireball]
    }
}