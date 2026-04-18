let audioValues = localStorage.getItem('audioValues');

import { Player } from './player.js';
import { InputHandler } from './input.js';
import {
    BatEnemy,
    MonsterEnemy,
    InsectEnemy,
    PlantEnemy,
    SpiderEnemy,
} from './enemies.js';
import { UI } from './UI.js';
import { Background } from './background.js';
import { CollisionAnimation } from './collisionAnimation.js';
import {
    popup,
    popupMain,
    hide,
    popUpInstruction,
    popupCampaign,
    popupRevivePrompt,
} from './popUp.js';
import { Attempt } from './attempt.js';
import { gameModes, bg, playerImage } from './dynamic.js';
import { HealthBar, EnergyBar } from './barUI.js';
import {
    Campaign,
    verifyCampaignData,
    getStageData,
    unlockStage,
    getEquippedItems,
    getUserLevel
} from './campaign.js';

let level;
let place;
let player;
let mode;
let check = false;
let isCampaign = false;
let campaignStage = 0;

//getting the name of player, place and mode
try {
    // let url = window.location.toString().split('?')[1];
    // place = url.split('=')[1].split('&')[0];
    // player = url.split('=')[2].split('&')[0];
    // mode = url.split('=')[3].split('&')[0];
    // level = url.split('=')[4];

    let params = new URLSearchParams(window.location.search);
    if (
        (params.has('cpm') && window.location.search.split('&').length == 1) ||
        (params.has('background') &&
            params.has('player') &&
            params.has('gameMode') &&
            window.location.search.split('&').length == 3)
    ) {
        if (
            params.has('cpm') &&
            window.location.search.split('&').length == 1
        ) {
            // Campaign logic here
            isCampaign = true;
            campaignStage = params.get('cpm');
            mode = gameModes[3];
            player = 'Shadow_Dog';
            verifyCampaignData(campaignStage);
        } else {
            // Leaderboard gamemodes logic here

            //----------check if background value is invalid-----------------
            place = params.get('background');
            player = params.get('player');
            mode = params.get('gameMode');

            for (const bground of bg) {
                if (place == bground.place) {
                    check = true;
                    break;
                }
            }
            if (!check) {
                place = 'City';
            } else {
                check = false;
            }
            //---------check if image value is invalid---------------------
            for (const image of playerImage) {
                if (player == image.player) {
                    check = true;
                    break;
                }
            }
            if (!check) {
                player = 'Shadow_Dog';
            } else {
                check = false;
            }
            //--------------check if mode-------------------
            for (const gameMode of gameModes) {
                if (gameMode.mode == mode) {
                    mode = gameMode;
                    check = true;
                }
            }
            if (!check) {
                mode = gameModes[0];
            } else {
                check = false;
            }
        }
    } else {
        // place = 'City';
        // player = 'Shadow_Dog';
        // mode = gameModes[0];
        alert('Invalid game url. You will be redirected to home page.');
        window.location.href = '/home';
    }
} catch (err) {
    // place = 'City';
    // player = 'Shadow_Dog';
    // mode = gameModes[0];
    alert(
        'An unknown error has occurred. Sorry for the inconvenience. You will be redirected back to home page.'
    );
    window.location.href = '/home';
}
//--------------check level-------------------
/*
try{
    //alert(level)
    level = parseInt(level);
    if(!Number.isInteger(level) || level <= 0){
        level = 1;
        console.log("not a number")
    }
}catch(err){
    console.log("err here")
    level = 1
}
*/
window.addEventListener('load', function () {
    //--------------------------------------------------------------
    const menuBtn = this.document.getElementById('menu');
    const mainPopUp = this.document.getElementById('popUpMain');
    const endGame = this.document.getElementById('endGame');
    const instuction = this.document.getElementById('instruction');
    const returnGame = this.document.getElementById('return');
    const closeInfo = this.document.getElementById('close');
    const closeAudio = this.document.getElementById('closeAudio');
    const popupInfo = this.document.getElementById('popUpInfo');
    const popupAudio = this.document.getElementById('popUpAudio');
    const audioElement = document.querySelector('#audio');
    const playButton = document.querySelector('#audioCheck');
    const audioSetting = this.document.querySelector('#audioSetting');
    const volumeControl = document.querySelector('#volume');
    const pannerControl = document.querySelector('#panner');
    //-------------------------Audio-------------------------------------
    const AudioContext = window.AudioContext || this.window.webkitAudioContext;
    const audioContext = new AudioContext();

    const track = audioContext.createMediaElementSource(audioElement);
    track.connect(audioContext.destination);

    //modify sounds
    const gainNode = audioContext.createGain();
    track.connect(gainNode).connect(audioContext.destination);

    const pannerOptions = { pan: 0 };
    const panner = new StereoPannerNode(audioContext, pannerOptions);

    if (audioValues == null) {
        audioValues = {
            BtnCheck: true,
            Volume: 1.0,
            Panner: 1.0,
        };

        localStorage.setItem('audioValues', JSON.stringify(audioValues));

        audioElement.play();
    } else {
        audioValues = JSON.parse(audioValues);
        playButton.checked = audioValues.BtnCheck;
        volumeControl.value = audioValues.Volume;
        pannerControl.value = audioValues.Panner;

        // set value
        gainNode.gain.value = volumeControl.value;
        panner.pan.value = pannerControl.value;
        if (playButton.checked) {
            audioElement.play();
        }
    }

    //---------------------Audio controls------------------------------

    playButton.onclick = function () {
        // check if context is in suspended state (autoplay policy)
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        audioValues.BtnCheck = playButton.checked;
        localStorage.setItem('audioValues', JSON.stringify(audioValues));
        playButton.checked ? audioElement.play() : audioElement.pause();
    };

    audioElement.addEventListener(
        'ended',
        () => {
            playButton.checked ? audioElement.play() : audioElement.pause();
        },
        false
    );

    volumeControl.addEventListener(
        'input',
        function () {
            //console.log(gainNode.gain.value)
            audioValues.Volume = this.value;
            localStorage.setItem('audioValues', JSON.stringify(audioValues));
            gainNode.gain.value = this.value;
        },
        false
    );

    pannerControl.addEventListener(
        'input',
        function () {
            //console.log(this.value)
            audioValues.Panner = this.value;
            localStorage.setItem('audioValues', JSON.stringify(audioValues));
            panner.pan.value = this.value;
        },
        false
    );
    //--------------------------------------------------------------------
    menuBtn.onclick = function () {
        popupMain('popUpMain', game.isCampaign, game, objectiveTracker);
        game.stop = true;
    };
    returnGame.onclick = function () {
        hide(mainPopUp);
        game.stop = false;
        animate(0);
    };
    endGame.onclick = function () {
        let check = confirm('Are you sure you want to end the game?');
        if (check) {
            window.location.href = '/home';
        }
    };
    instuction.onclick = function () {
        hide(mainPopUp);
        popUpInstruction('popUpInfo');
    };
    closeInfo.onclick = function () {
        hide(popupInfo);
        popupMain('popUpMain', game.isCampaign, game, objectiveTracker);
    };
    closeAudio.onclick = function () {
        console.log('HERE');
        hide(popupAudio);
        popupMain('popUpMain', game.isCampaign, game, objectiveTracker);
    };
    audioSetting.onclick = function () {
        hide(mainPopUp);
        popupMain('popUpAudio');
    };
    window.addEventListener('keydown', (e) => {
        if (e.key === 'i' && !game.gameOver) {
            if (!game.stop) {
                game.stop = true;
                popUpInstruction('popUpInfo');
            } else if (popupInfo.style.display != 'none') {
                hide(popupInfo);
                if (mainPopUp.style.display != 'none') hide(mainPopUp);
                game.stop = false;
                animate(0);
            } else if (mainPopUp.style.display != 'none') {
                hide(mainPopUp);
                popUpInstruction('popUpInfo');
            } else if (popupAudio.style.display != 'none') {
                hide(popupAudio);
                popUpInstruction('popUpInfo');
            }
        }

        //show instructions when 'm' is pressed ----------------------

        if (e.key === 'm' && !game.gameOver) {
            if (!game.stop) {
                game.stop = true;
                popupMain('popUpMain', game.isCampaign, game, objectiveTracker);
            } else if (mainPopUp.style.display != 'none') {
                hide(mainPopUp);
                game.stop = false;
                animate(0);
            } else if (popupInfo.style.display != 'none') {
                hide(popupInfo);
                popupMain('popUpMain', game.isCampaign, game, objectiveTracker);
            } else if (popupAudio.style.display != 'none') {
                hide(popupAudio);
                popupMain('popUpMain', game.isCampaign, game, objectiveTracker);
            }
        }

        if (e.key === 'a' && !game.gameOver) {
            if (!game.stop) {
                game.stop = true;
                popupMain('popUpAudio');
            } else if (popupAudio.style.display != 'none') {
                hide(popupAudio);
                if (mainPopUp.style.display != 'none') hide(mainPopUp);
                game.stop = false;
                animate(0);
            } else if (popupInfo.style.display != 'none') {
                hide(popupInfo);
                popupMain('popUpAudio');
            } else if (mainPopUp.style.display != 'none') {
                hide(mainPopUp);
                popupMain('popUpAudio');
            }
        }

        if (e.key === 'Escape' && !game.gameOver) {
            // close all popups
            game.stop = false;
            const popUpList = [popupInfo, popupAudio, mainPopUp];
            let i = 0;
            popUpList.forEach((popup) => {
                if (popup.style.display != 'none') {
                    i++;
                    hide(popup);
                }
            });
            if (i > 0) animate(0);
        }

        if (e.key === '1' && !game.gameOver) {
            window.useLowMedicine();
        }
        if (e.key === '2' && !game.gameOver) {
            window.useMedMedicine();
        }
        if (e.key === '3' && !game.gameOver) {
            window.useHighMedicine();
        }
        // if (e.key === '4' && !game.gameOver) {
        //     window.useReviveMedicine();
        // }
    });

    window.addEventListener('blur', function () {
        if (!game.gameOver) {
            game.stop = true;
            popupMain('popUpMain', game.isCampaign, game, objectiveTracker);
        }
    });

    window.getCurrentHealth = function () {
        return game.player.health;
    };
    window.getMaxHealth = function () {
        return game.modeHealth;
    };
    window.setMaxHealth = function () {
        game.player.health = game.modeHealth;
        game.healthbar.updateHealth(game.player.health);
    };
    window.addHealth = function (health) {
        game.player.health += health;
        game.healthbar.updateHealth(game.player.health);
    };
    window.setReviveHealth = function () {
        game.player.health = game.modeHealth * 0.4;
        game.healthbar.updateHealth(game.player.health);
    };
    //--------------------Game----------------------------------------------
    const canvas = document.getElementById('canvas1');
    const body = this.document.querySelector('.body');
    const loading = document.getElementById('loading');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 80;
            this.speed = 0;
            this.speedMultiplier = 0;
            this.maxSpeed = 4;
            //this.choosenLevel = level;
            this.additionalHealth = 0;
            this.place = place;
            this.playerImage = player;
            this.modeHealth = mode.health + this.additionalHealth; // max health
            this.background = new Background(this);
            this.player = new Player(this);
            this.healthbar = new HealthBar(this);
            this.energybar = new EnergyBar(this);
            this.input = new InputHandler(this);
            this.attempt = new Attempt(this);
            this.isCampaign = isCampaign;
            this.campaign = null;
            this.stageEnemies = [];
            this.score = 0;
            this.time = 0;
            this.movementTime = 0;
            this.distance = 0;
            this.enemiesKilled = 0;
            this.maxTime = mode.maxTime;
            this.gamemode = mode.mode;
            this.UI = new UI(this);
            this.enemies = []; // enemies will be added later
            this.enemycountDelTime = 0; // used to accumulate the deltatime
            this.enemyInterval = 1000; // add enemy per second
            this.particles = [];
            this.fireballs = [];
            this.maxParticles = 50;
            this.collisions = [];
            this.floatingTexts = [];
            this.debug = false;
            this.gameOver = false;
            this.stop = false;
            this.ready = false;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            this.textColour = 'black';
        }
        update(deltaTime) {
            // Bug fix: Prevent deltaTime from increasing too much when game is paused
            if (deltaTime > 10 || deltaTime < 5) deltaTime = 7;

            this.healthbar.updateHealth(this.player.health);
            this.energybar.updateEnergy(this.player.energy);

            if (this.ready) {
                this.time += deltaTime;
            }

            this.movementTime += deltaTime * this.speedMultiplier;

            this.distance =
                (this.movementTime * 0.001).toFixed(1) * this.player.pace;

            // gameOver requirements =================
            if (this.isCampaign) {
                if (this.distance >= this.campaign.props.distance)
                    this.gameOver = true;
            } else {
                if (
                    this.gamemode == 'Time-Rush' &&
                    this.maxTime != null &&
                    this.time > this.maxTime
                ) {
                    this.gameOver = true;
                }
                if (
                    this.gamemode == 'Enemy-Rush' &&
                    mode.killed != null &&
                    this.enemiesKilled == mode.killed
                ) {
                    this.gameOver = true;
                }
            }

            this.background.update();
            this.player.update(this.input.keys, deltaTime);

            // control enemy frames from image
            if (this.enemycountDelTime > this.enemyInterval) {
                this.addEnemy();
                this.enemycountDelTime = 0;
            } else {
                this.enemycountDelTime += deltaTime;
            }
            //console.log(this.enemies)
            this.enemies.forEach((enemy) => {
                enemy.updateEnemy(deltaTime);
            });
            // handle floatingTexts
            this.floatingTexts.forEach((floatingText) => {
                floatingText.update();
            });
            //handle particles
            this.particles.forEach((particle, index) => {
                particle.update();
            });
            this.fireballs.forEach((fireball, index) => {
                fireball.update();
            });
            //console.log(this.particles)
            if (this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles;
            }
            //handle collision sprites
            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
            });
            // remove canvas graphics after purpose
            this.enemies = this.enemies.filter((enemy) => !enemy.outScreen);
            this.floatingTexts = this.floatingTexts.filter(
                (floatingText) => !floatingText.outScreen
            );
            this.particles = this.particles.filter(
                (particle) => !particle.outScreen
            );
            this.collisions = this.collisions.filter(
                (collisions) => !collisions.outScreen
            );
            this.fireballs = this.fireballs.filter(
                (fireball) => !fireball.outScreen
            );
        }
        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
            this.healthbar.draw(context);
            this.energybar.draw(context);
            //console.log(this.enemies)
            this.enemies.forEach((enemy) => {
                //console.log(enemy)
                enemy.drawEnemy(context);
            });
            this.particles.forEach((particle) => {
                particle.draw(context);
            });
            this.fireballs.forEach((fireball) => {
                fireball.draw(context);
            });
            this.collisions.forEach((collision) => {
                collision.draw(context);
            });
            this.floatingTexts.forEach((floatingText) => {
                floatingText.draw(context);
            });
            this.UI.draw(context);
        }
        addEnemy() {
            if (this.ready) {
                if (this.isCampaign) {
                    this.stageEnemies.forEach((enemy) => {
                        if (
                            enemy instanceof MonsterEnemy &&
                            Math.random() < enemy.probability
                        ) {
                            this.enemies.push(
                                new MonsterEnemy(this, enemy.damage)
                            );
                        }
                        if (
                            enemy instanceof BatEnemy &&
                            Math.random() < enemy.probability
                        ) {
                            this.enemies.push(new BatEnemy(this, enemy.damage));
                        }
                        if (
                            enemy instanceof InsectEnemy &&
                            Math.random() < enemy.probability
                        ) {
                            this.enemies.push(
                                new InsectEnemy(this, enemy.damage)
                            );
                        }
                        if (
                            enemy instanceof PlantEnemy &&
                            Math.random() < enemy.probability &&
                            this.speed > 0
                        ) {
                            this.enemies.push(
                                new PlantEnemy(this, enemy.damage)
                            );
                        }
                        if (
                            enemy instanceof SpiderEnemy &&
                            Math.random() < enemy.probability
                        ) {
                            this.enemies.push(
                                new SpiderEnemy(this, enemy.damage)
                            );
                        }
                    });
                } else {
                    if (Math.random() < 0.5) {
                        this.enemies.push(new MonsterEnemy(this));
                    }
                    //if(this.choosenLevel >= 2){
                    this.enemies.push(new BatEnemy(this));
                    //}
                    //if(this.choosenLevel >= 3){
                    this.enemies.push(new InsectEnemy(this));
                    //}

                    if (this.gamemode == 'Enemy-Rush') {
                        if (this.speed > 0 && Math.random() < 0.1) {
                            this.enemies.push(new PlantEnemy(this));
                        } else if (Math.random() < 0.3) {
                            this.enemies.push(new SpiderEnemy(this));
                        }
                    }
                    //console.log(this.enemies); // check if the enemies are add in array properlry
                }
            }
        }

        destroyAllEnemies() {
            this.enemies.forEach((enemy) => {
                enemy.outScreen = true;
                this.collisions.push(
                    new CollisionAnimation(
                        this,
                        enemy.x + enemy.width * 0.5,
                        enemy.y + enemy.height * 0.5
                    )
                );
            });
        }

        revivePlayer() {
            this.destroyAllEnemies();
            this.player.setState(6, 0);
            this.player.health = this.modeHealth * 0.4;
            // this.player.x = 0
            this.ready = false;
            this.gameOver = false;

            animate(0);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    console.log(game);
    let lastTime = 0;

    async function checkCampaign() {
        // loading animation
        ctx.fillStyle = '#39D879';
        ctx.fillRect(0, 0, canvas.width, canvas.height);


        await getUserLevel().then((result) => {
            console.log(result)
            // notLoggedIn
            if(result){
                console.log(result.level)
                if(result.level>= 4) game.player.attackStates[1].locked = false
                if(result.level>= 8) game.player.attackStates[2].locked = false
                getEquippedItems().then((result) => {
                    // game.player.attackStates[2].design = 
                    let equippedFireball = result.find(item => {
                        return item.productType == "fireball"
                    })

                    let equippedShield = result.find(item => {
                        return item.productType == "equipment"
                    })

                    console.log(equippedShield)
                    if(equippedShield) {
                        game.modeHealth += parseInt(equippedShield.increasement)
                        game.player.health += parseInt(equippedShield.increasement)
                        game.healthbar.maxHealth += parseInt(equippedShield.increasement)
                    }
                    console.log(equippedFireball)
                    if(equippedFireball) game.player.attackStates[2].design = equippedFireball.productName
                })
            }
        })
        if (isCampaign) {
            await verifyCampaignData(campaignStage).then(
                (stageData) =>
                    (game.campaign = new Campaign(
                        game,
                        stageData[0],
                        stageData[1]
                    ))
            );
            await getStageData(game.campaign.stage)
                .then((stageProps) => (game.campaign.props = stageProps))
                .catch((err) => console.log(err));
            game.campaign.setStagePlace();
            game.campaign.setStageEnemies();
            animate(0);
        } else animate(0);

        // stop showing loading animation
        loading.style.display = 'none';
    }

    function animate(timestamp) {
        const deltaTime = timestamp - lastTime; // time interval between each animation loop
        lastTime = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        game.update(deltaTime);
        game.draw(ctx);

        if (!game.gameOver) {
            //console.log(game.stop)

            if (!game.stop) {
                requestAnimationFrame(animate); //create animation loop
            }
        } else {
            if (game.isCampaign) {
                let obj = objectiveTracker();
                let completedObj =
                    game.campaign.processCompletedObjectives(obj);

                if (game.distance >= game.campaign.props.distance) {
                    // user completed stage

                    console.log(game.campaign.completed);
                    if (!game.campaign.completed) {
                        game.campaign.updateStageCompletion(obj);
                        if (!game.campaign.isLastStage)
                            unlockStage(game.campaign.stage + 1);
                    }

                    // user completed an objective not done before
                    else if (
                        (!game.campaign.obj_one && obj.o1) ||
                        (!game.campaign.obj_two && obj.o2) ||
                        (!game.campaign.obj_three && obj.o3)
                    ) {
                        game.campaign.updateObjectivesDone(obj);
                    }

                    // calculateBonuses
                    let tableBonusData =
                        game.campaign.processFirstTimeData(obj);

                    popupCampaign(
                        'popUpDiv',
                        true,
                        game.score,
                        game.time,
                        game.distance,
                        game.campaign.props,
                        completedObj,
                        tableBonusData
                    );
                } else {
                    //objective doesnt count when user fails
                    //popupRevivePrompt('popUpDiv')
                    popupRevivePrompt(
                        'popUpDiv',
                        false,
                        game.score,
                        game.time,
                        game.distance,
                        game.campaign.props,
                        completedObj,
                        '',
                        game
                    );
                }
            } else {
                game.attempt
                    .addAttempt()
                    .then(() => game.attempt.updateHighScore())
                    .then(() => {
                        hide(popupInfo);
                        hide(mainPopUp);
                        window.addCoins(Math.floor(game.score / 10));
                        if (game.score >= 100) {
                            const luckyChance = window.getLuckyChance();
                            window.setLuckyDrawChance(luckyChance + 1, 0);
                        }
                        popup(
                            'popUpDiv',
                            game.score,
                            game.time,
                            game.distance,
                            game.attempt.highScore
                        );
                    });
            }
        }
    }
    checkCampaign();
    function objectiveTracker(stage = game.campaign.stage) {
        const gameTime = game.time * 0.001;
        const objectives = [
            {
                // stage 1 objectives
                o1: gameTime < 100,
                o2: game.enemiesKilled >= 2,
                o3: game.player.health / game.modeHealth > 0.5,
            },
            {
                // stage 2 objectives
                o1: gameTime < 100,
                o2: game.enemiesKilled >= 2,
                o3: game.player.health / game.modeHealth > 0.5,
            },
            {
                // stage 3 objectives
                o1: gameTime < 100,
                o2: game.enemiesKilled >= 2,
                o3: game.player.health / game.modeHealth > 0.5,
            },
            {
                // stage 4 objectives
                o1: gameTime < 100,
                o2: game.enemiesKilled >= 2,
                o3: game.player.health / game.modeHealth > 0.5,
            },
            {
                // stage 5 objectives
                o1: gameTime < 100,
                o2: game.enemiesKilled >= 2,
                o3: game.player.health / game.modeHealth > 0.5,
            },
            {
                // stage 6 objectives
                o1: gameTime < 100,
                o2: game.enemiesKilled >= 2,
                o3: game.player.health / game.modeHealth > 0.5,
            },
            {
                // stage 7 objectives
                o1: gameTime < 100,
                o2: game.enemiesKilled >= 2,
                o3: game.player.health / game.modeHealth > 0.5,
            },
            {
                // stage 8 objectives
                o1: gameTime < 100,
                o2: game.enemiesKilled >= 2,
                o3: game.player.health / game.modeHealth > 0.5,
            },
            {
                // stage 9 objectives
                o1: gameTime < 100,
                o2: game.enemiesKilled >= 2,
                o3: game.player.health / game.modeHealth > 0.5,
            },
            {
                // stage 10 objectives
                o1: gameTime < 100,
                o2: game.enemiesKilled >= 2,
                o3: game.player.health / game.modeHealth > 0.5,
            },
            {
                // stage 11 objectives
                o1: gameTime < 100,
                o2: game.enemiesKilled >= 2,
                o3: game.player.health / game.modeHealth > 0.5,
            },
        ];

        return objectives[stage - 1];
    }
});
