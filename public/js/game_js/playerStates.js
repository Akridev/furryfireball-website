import { Dust, Fire, Splash } from './particles.js';
import Fireball from './fireball.js';

const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    HIT: 4,
    DEATH: 5,
    REVIVAL: 6,
    // attackStates
    ROLLING: 0,
    DIVING: 1,
    SHOOT: 2
}

const stateSpeed = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 1,
    ROLLING: 2,
    DIVING: 0,
    SHOOT: 0
}

let previousState = null;


class State {
    constructor(state, game){
        this.state = state;
        this.game = game;
    }
}

export class Sitting extends State {
    constructor(game){
        super('SITTING', game);
    }

    enter(){
        previousState = {
            state: states.SITTING,
            stateSpeed: stateSpeed.SITTING
        }
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 4;
        this.game.player.frameY = 5;
    }

    handleInput(input){
        if(input.includes('ArrowLeft') || input.includes('ArrowRight')){
            this.game.player.setState(states.RUNNING, 1);
        }
        else if(this.game.player.checkAttackState(input, states.ROLLING)){
            this.game.player.setState(states.ROLLING, 2, true);
        }
        else if(input.includes('ArrowUp')) this.game.player.setState(states.JUMPING, 1);
        else if(this.game.player.checkAttackState(input, states.SHOOT)) this.game.player.setState(states.SHOOT, 0, true);
    }
}

export class Running extends State {
    constructor(game){
        super('RUNNING',game);
    }

    enter(){
        previousState = {
            state: states.RUNNING,
            stateSpeed: stateSpeed.RUNNING
        }
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 8;
        this.game.player.frameY = 3;
    }

    handleInput(input){
        this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.5,
             this.game.player.y + this.game.player.height));

        if(input.includes('ArrowDown')){
            this.game.player.setState(states.SITTING, 0);
        }
        else if(input.includes('ArrowUp')){
            this.game.player.setState(states.JUMPING, 1);
        }
        else if(this.game.player.checkAttackState(input, states.ROLLING)){
            this.game.player.setState(states.ROLLING, 2, true);
        }
        else if(this.game.player.checkAttackState(input, states.SHOOT)) this.game.player.setState(states.SHOOT, 1, true);
    }
}

export class Jumping extends State {
    constructor(game){
        super('JUMPING',game);
    }

    enter(){
        if(this.game.player.onGround()) this.game.player.vy -= 25;
        //this.game.player.game.score++; // add score on jump (for testing purposes)
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 1;
    }

    handleInput(input){
        if(this.game.player.vy > this.game.player.weight){
            this.game.player.setState(states.FALLING, 1);
        }
        else if(this.game.player.checkAttackState(input, states.ROLLING)){
            this.game.player.setState(states.ROLLING, 2, true);
        }
        else if(this.game.player.checkAttackState(input, states.DIVING) && this.game.player.vy > -17){ // to not make it spammable
            this.game.player.setState(states.DIVING, 0, true);
        }else if(this.game.player.checkAttackState(input, states.SHOOT)) this.game.player.setState(states.SHOOT, 1, true);
    }
}

export class Falling extends State {
    constructor(game){
        super('FALLING',game);
    }

    enter(){
        previousState = {
            state: states.FALLING,
            stateSpeed: stateSpeed.FALLING
        }
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 2;
    }

    handleInput(input){
        if(this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
        }
        else if(this.game.player.checkAttackState(input, states.ROLLING)){
            this.game.player.setState(states.ROLLING, 2, true);
        }
        else if(this.game.player.checkAttackState(input, states.DIVING)){
            this.game.player.setState(states.DIVING, 0, true);
        }
        else if(this.game.player.checkAttackState(input, states.SHOOT)) this.game.player.setState(states.SHOOT, 1, true);
    }
}

export class Rolling extends State {
    constructor(game){
        super('ROLLING',game);
    }

    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 6;
    }

    handleInput(input){
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5,
            this.game.player.y + this.game.player.height * 0.5));
        if((!input.includes('Enter') && this.game.player.onGround()) || (this.game.player.energy<=0)){
            this.game.player.setState(states.RUNNING, 1);
        }else if(!input.includes('Enter') && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING, 1);
        }else if(input.includes('Enter') && input.includes('ArrowUp') && this.game.player.onGround()){
            this.game.player.vy -= 27;
        }else if(this.game.player.checkAttackState(input, states.DIVING) && !this.game.player.onGround() &&  this.game.player.vy > -17){
            this.game.player.setState(states.DIVING, 0, true);
        }
    }
}

export class Diving extends State {
    constructor(game){
        super('DIVING',game);
    }

    enter(){
        this.game.player.energy -= 10;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 6;
        this.game.player.vy = 15;
    }

    handleInput(input){
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5,
            this.game.player.y + this.game.player.height * 0.5));
        if(this.game.player.checkAttackState(input, states.ROLLING) && this.game.player.onGround()){
            this.game.player.setState(states.ROLLING, 2, true);
        }
        else if(this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
            for(let i = 0; i < 30; i++){
                            this.game.particles.unshift(new Splash(this.game, this.game.player.x + this.game.player.width * 0.5,
                                 this.game.player.y + this.game.player.height));
            }
        }
    }
}

export class Hit extends State {
    constructor(game){
        super('HIT',game);
    }

    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 10;
        this.game.player.frameY = 4;
    }

    handleInput(input){
        if(this.game.player.frameX >= 10 && previousState) this.game.player.setState(previousState.state, previousState.stateSpeed)
        else if(this.game.player.frameX >= 10 && this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
        }else if(this.game.player.frameX >= 10 && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING, 2);
        }
    }
}

export class Death extends State {
    constructor(game){
        super('DEATH',game);
    }

    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 12;
        this.game.player.frameY = 8;
    }
}

export class Revival extends State {
    constructor(game){
        super('REVIVAL',game);
    }

    enter(){
        this.game.player.frameX = 12;
        this.game.player.maxFrame = 12;
        this.game.player.frameY = 8;
    }
}

export class Shoot extends State {
    constructor(game){
        super('SHOOT',game)
        this.flag = true;
    }

    enter(){
        this.game.player.energy -= this.game.player.attackStates[states.SHOOT].energyNeeded
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 4;
        this.game.player.frameY = 7;
    }

    handleInput(input){
        if(this.game.player.frameX === 0 && this.flag){
            this.flag = false;
            this.game.fireballs.unshift(new Fireball(this.game, this.game.player.x, this.game.player.y, this.game.player.attackStates[2].design))
        }
        if(this.game.player.frameX >= 4){
            this.flag = true;
            if(previousState) this.game.player.setState(previousState.state, previousState.stateSpeed)
            else if(this.game.player.onGround()){
                this.game.player.setState(states.RUNNING, 1);
            }
            else if(this.game.player.vy > this.game.player.weight){
                this.game.player.setState(states.FALLING, 2);
            }
        }
        
    }
}