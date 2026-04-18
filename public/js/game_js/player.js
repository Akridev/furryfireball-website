import {
    Sitting,
    Running,
    Jumping,
    Falling,
    Rolling,
    Diving,
    Hit,
    Death,
    Shoot,
    Revival,
} from './playerStates.js';
import { CollisionAnimation } from './collisionAnimation.js';
import { playerImage } from './dynamic.js';
import { FloatingText } from './floatingText.js';

function getPlayerImage(gameImage) {
    for (var i = 0; i < playerImage.length; i++) {
        if (gameImage == playerImage[i].player) {
            return playerImage[i].image;
        }
    }
}

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0; // velocity y, pull player upwards
        this.weight = 1; // pull player downwards
        this.image = getPlayerImage(this.game.playerImage);
        this.maxFrame;
        this.fps = 20; // frames per second
        this.frameInterval = 1000 / this.fps; // the time every frame be displayed per second
        this.frameTimer = 0; // to accumulate the deltatime
        this.frameX = 0;
        this.frameY = 0;
        this.pace = 4;
        this.speed = 0;
        this.maxSpeed = 5;
        this.energyIsIncreasing = false;
        this.eTimeoutFlag = true;
        this.health = this.game.modeHealth; // the current health
        this.maxEnergy = 50;
        this.energy = this.maxEnergy;
        this.attackStates = [
            {
                state: new Rolling(this.game),
                input: 'Enter',
                locked: false,
                energyNeeded: 1
            },
            {
                state: new Diving(this.game),
                input: 'ArrowDown',
                locked: true,
                energyNeeded: 10
            },
            {
                state: new Shoot(this.game),
                input: ' ',
                locked: true,
                energyNeeded: 4,
                design: 'redfire'
            }
        ]
        this.states = [
            new Sitting(this.game), // 0
            new Running(this.game),
            new Jumping(this.game),
            new Falling(this.game),
            new Hit(this.game),
            new Death(this.game),
            new Revival(this.game)
        ];
        this.dmgDisabled = false;
        /**new Sitting(this.game), // 0
            new Running(this.game), // 1
            new Jumping(this.game), // 2
            new Falling(this.game), // 3
            new Rolling(this.game), // 4
            new Diving(this.game), // 5
            new Hit(this.game), // 6
            new Death(this.game), // 7
            new Shoot(this.game), 8 */
    }

    update(input, deltaTime) {
        if (this.currentState != this.states[5] && this.currentState != this.states[6]) {
            this.currentState.handleInput(input);
            this.checkCollision();
            this.updateEnergy();
            //horizontal movement
            this.x += this.speed;
        }

        if (
            input.includes('ArrowRight') &&
            this.currentState !== this.states[4]
        )
            this.speed = this.maxSpeed;
        else if (
            input.includes('ArrowLeft') &&
            this.currentState !== this.states[4]
        )
            this.speed = -this.maxSpeed;
        else this.speed = 0;
        //horizontal boundaries
        //Cause the player not to move out of the box
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width)
            this.x = this.game.width - this.width;

        //vertical movement
        //if(input.includes('ArrowUp') && this.onGround()) this.vy -=8;
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        //if (!this.onGround()) this.vy += this.weight;
        //verticle boundaries
        if (this.y > this.game.height - this.height - this.game.groundMargin)
            this.y = this.game.height - this.height - this.game.groundMargin;
        // doesnt go below ground margin
        if (this.y > this.game.height - this.height - this.game.groundMargin)
            this.y = this.game.height - this.height - this.game.groundMargin;

        //sprite animation
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            // when there got too much time interval between each animation loop, in order to fix the blink when switch between each frame
            if (
                this.currentState == this.states[5] &&
                this.frameX === this.maxFrame
            ){  
                this.game.gameOver = true;
            }
                
            else if(this.currentState == this.states[6] && this.frameX != 0) this.frameX--;
            else if (this.currentState == this.states[6] && this.frameX == 0) this.setState(0, 0)
            else if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }

    draw(context) {
        if (this.game.debug)
            context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(
            this.image,
            this.frameX * this.width,
            this.frameY * this.height,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    onGround() {
        return (
            this.y >= this.game.height - this.height - this.game.groundMargin
        );
    }

    checkAttackState(input, state){
        if(input.includes(this.attackStates[state].input) && !this.attackStates[state].locked && this.energy >= this.attackStates[state].energyNeeded) return true
        else return false;
    }

    setState(state, speed, isAttack=false) {
        if(isAttack) this.currentState = this.attackStates[state].state;
        else if(state === 6){
            this.currentState = this.states[state];
        }
        else this.currentState = this.states[state];
        this.game.speedMultiplier = speed;
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }

    checkCollision() {
        this.game.enemies.forEach((enemy) => {
            this.game.particles.forEach((particle) => {
                if (
                    enemy.hitbox.x <
                        particle.x +
                            particle.size * 0.3 +
                            particle.size * 0.45 &&
                    enemy.hitbox.x + enemy.hitbox.width >
                        particle.x + particle.size * 0.3 &&
                    enemy.hitbox.y <
                        particle.y +
                            particle.size * 0.45 +
                            particle.size * 0.45 &&
                    enemy.hitbox.y + enemy.hitbox.height >
                        particle.y + particle.size * 0.45
                ) {
                    //collision detected
                    enemy.collison = true;
                }
            });

            this.game.fireballs.forEach((fireball) => {
                if (
                    enemy.hitbox.x <
                        fireball.hitbox.x + fireball.hitbox.width &&
                    enemy.hitbox.x + enemy.hitbox.width > fireball.hitbox.x &&
                    enemy.hitbox.y <
                        fireball.hitbox.y + fireball.hitbox.height &&
                    enemy.hitbox.y + enemy.hitbox.height > fireball.hitbox.y
                ) {
                    //collision detected
                    enemy.collison = true;
                    fireball.outScreen = true;
                }
            });
        });

        this.game.enemies.forEach((enemy) => {
            if (
                (enemy.hitbox.x < this.x + this.width &&
                    enemy.hitbox.x + enemy.hitbox.width > this.x &&
                    enemy.hitbox.y < this.y + this.height &&
                    enemy.hitbox.y + enemy.hitbox.height > this.y) ||
                enemy.collison
            ) {
                //collision detected
                if (
                    this.currentState === this.attackStates[0].state ||
                    this.currentState === this.attackStates[1].state ||
                    enemy.collison && !this.dmgDisabled
                ) {
                    enemy.outScreen = true;
                    this.game.collisions.push(
                        new CollisionAnimation(
                            this.game,
                            enemy.x + enemy.width * 0.5,
                            enemy.y + enemy.height * 0.5
                        )
                    );
                    this.game.score += enemy.points;
                    this.game.enemiesKilled++;
                    this.game.floatingTexts.push(
                        new FloatingText(
                            '+' + enemy.points,
                            enemy.hitbox.x,
                            enemy.hitbox.y,
                            130,
                            45
                        )
                    );
                } else if (!this.dmgDisabled) {
                    enemy.outScreen = true;
                    this.game.collisions.push(
                        new CollisionAnimation(
                            this.game,
                            enemy.x + enemy.width * 0.5,
                            enemy.y + enemy.height * 0.5
                        )
                    );

                    this.health -= enemy.damage;
                    if (this.health <= 0) this.game.player.setState(5, 0);
                    else {
                        this.setState(4, 0);
                        // this.dmgDisabled = true;
                        setTimeout(() => (this.dmgDisabled = false), 1000);
                    }
                }
            }
        });
    }

    updateEnergy() {
        if (
            this.currentState === this.attackStates[0].state ||
            this.currentState === this.attackStates[1].state ||
            this.currentState === this.attackStates[2].state
        ) {
            if (this.currentState === this.attackStates[0].state) {
                this.energy -= 0.05;
            }

            this.energyIsIncreasing = false;
            this.eTimeoutFlag = true;
        } else if (
            !(
                this.currentState === this.attackStates[0].state ||
                this.currentState === this.attackStates[1].state ||
                this.currentState === this.attackStates[2].state
            ) &&
            this.energy < this.maxEnergy
        ) {
            if (this.eTimeoutFlag) {
                setTimeout(() => {
                    this.energyIsIncreasing = true;
                }, 500);
            }

            this.eTimeoutFlag = false;

            if (this.energyIsIncreasing) this.energy += 0.05;

            if (this.energy >= this.maxEnergy) {
                this.eTimeoutFlag = true;
                this.energy = this.maxEnergy;
            }
        }
    }
}
