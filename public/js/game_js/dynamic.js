export const bg = [
          //background:City
          {
            place:'City',
            layers:
            [
                {
                    layer: document.getElementById('city1'),
                    speed: 0
                },
                {
                    layer: document.getElementById('city2'),
                    speed: 0.1
                },
                {
                    layer: document.getElementById('city3'),
                    speed: 0.2
                },
                {
                    layer: document.getElementById('city4'),
                    speed: 0.4
                },
                {
                    layer: document.getElementById('city5'),
                    speed: 7 
                },
            ],
        },
    //background:Beach
    {
        place:'Beach',
        layers:
        [
            {
                layer: document.getElementById('layer1'),
                speed: 0
            },
            {
                layer: document.getElementById('layer2'),
                speed: 0.1
            },
            {
                layer: document.getElementById('layer3'),
                speed: 0.4
            },
            {
                layer: document.getElementById('layer4'),
                speed: 0.4
            },
            {
                layer: document.getElementById('layer5'),
                speed: 0.7
            },
        ],
    },
    //background:Forest
    {
        place:'Forest',
        layers:
        [
            {
                layer: document.getElementById('forest1'),
                speed: 0
            },
            {
                layer: document.getElementById('forest2'),
                speed: 0.2
            },
            {
                layer: document.getElementById('forest3'),
                speed: 0.4
            },
            {
                layer: document.getElementById('forest4'),
                speed: 0.8
            },
            {
                layer: document.getElementById('forest5'),
                speed: 1 
            },
        ],
    },
  
]

//--------------getting player images---------------------
export const playerImage = [
    //player:black dog
    {
        player: "Shadow_Dog",
        image:  document.getElementById('player')
    },
]

//--------------getting game modes---------------------
export const gameModes = [
    {
        mode: "Endless",
        health: 100,
    },
    {
        mode: "Time-Rush",
        health: 50,
        maxTime: 10000,
    },
    {
        mode: "Enemy-Rush",
        health: 50,
        killed: 10
    },
    {
        mode: "Campaign",
        health: 100
    },
]