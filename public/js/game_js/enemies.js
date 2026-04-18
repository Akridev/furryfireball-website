class Enemy {
    constructor() {
        this.frameX = 0;
        this.frameY = 0;
        this.points = 1;
        this.fps = 20; // frames per second
        this.frameInterval = 1000 / this.fps; // the time every frame be displayed per second
        this.countDelTime = 0; // to accumulate the time beteween each clip that should be deleted
        this.outScreen = false;
        this.collision = false;
    }

    updateEnemy(deltaTime) {
        // movement
        this.hitbox.x -= this.speedX;
        this.x -= this.speedX; // move to the left
        this.y += this.speedY;
        this.hitbox.y += this.speedY;
        if (this.countDelTime > this.frameInterval) {
            this.countDelTime = 0;
            // when there got too much time interval between each animation loop, in order to fix the blink when switch between each frame
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0; // reset to clip image from the first frame
        } else {
            this.countDelTime += deltaTime;
        }

        // check if the enemy out the screen
        if (this.x + this.width < 0) this.outScreen = true;
    }

    drawEnemy(context) {
        // if(this.game.debug) context.strokeRect(this.x+10, this.y-20, this.width-10, this.height-10);
        if(this.game.debug) context.strokeRect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height);
        context.drawImage(
            this.image,
            this.frameX * this.width, // clip from image
            0,
            this.width, // the enemy width
            this.height, // enemy height
            this.x, // the horizontal position at canvas
            this.y - 30,
            this.width,
            this.height
        );
    }
}

class Hitbox extends Enemy{
    constructor(x, y, width, height){
        super()
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

export class BatEnemy extends Enemy {
    constructor(game, damage=5, probability=1) {
        super();
        this.game = game;
        this.width = 72.75;
        this.height = 44;
        this.x = this.game.width; // start from the most right
        this.y = Math.random() * this.game.height * 0.5; // let the enemy appear different height in game
        this.speedX = 2;
        this.speedY = 0;
        this.maxFrame = 3;
        this.hitbox = new Hitbox(this.x+10, this.y-20, this.width-10, this.height-10)
        this.points = 5;
        this.damage = damage;
        this.probability = probability
        // to have some fly angle
        this.flyAngle = 0; // initial no angle
        this.velocityAngle = Math.random() * 0.1; // make the angle random
        this.image = document.getElementById('bat_enemy');
    }
    updateEnemy(deltaTime) {
        super.updateEnemy(deltaTime);
        this.flyAngle += this.velocityAngle;
        this.y += Math.sin(this.flyAngle);
        this.hitbox.y += Math.sin(this.flyAngle);
    }
}

export class MonsterEnemy extends Enemy {
    constructor(game, damage=5, probability=1) {
        super();
        this.game = game;
        this.width = 205;
        this.height = 135;
        this.x = this.game.width;
        this.y = this.game.height - this.height - 30;
        this.hitbox = new Hitbox(this.x+20, this.y-11, this.width-95, this.height-40)
        this.points = 5;
        this.damage = damage;
        this.probability = probability
        this.speedX = 2;
        this.speedY = 0;
        this.maxFrame = 6;
        this.image = document.getElementById('monster_enemy');
    }
}

export class PlantEnemy extends Enemy {
    constructor(game, damage=20, probability=1) {
        super();
        this.game = game;
        this.width = 60;
        this.height = 87;
        this.x = this.game.width;
        this.y = this.game.height - this.height - 30;
        this.hitbox = new Hitbox(this.x, this.y - 30, this.width, this.height)
        this.points = 15;
        this.damage = damage;
        this.probability = probability
        this.speedX = this.game.background.backgroundLayers[1].speedModifier;
        this.speedY = 0;
        this.maxFrame = 1;
        this.image = document.getElementById('plant_enemy');
    }
    updateEnemy(deltaTime){
        super.updateEnemy(deltaTime)
        if(this.game.player.currentState === this.game.player.states[0] || this.game.player.currentState === this.game.player.states[6]){
            this.speedX = 0;
        }
        else 
            this.speedX = this.game.background.backgroundLayers[1].speedModifier;
    }
}

export class InsectEnemy extends Enemy {
    constructor(game, damage=15, probability=1) {
        super();
        this.game = game;
        this.width = 60;
        this.height = 44;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = 2;
        this.speedY = 0;
        this.maxFrame = 5;
        this.points = 10;
        this.damage = damage;
        this.probability = probability
        this.flyAngle = 0; // initial no angle
        this.velocityAngle = Math.random() * 0.1; // make the angle random
        this.hitbox = new Hitbox(this.x, this.y - 30, this.width, this.height)
        this.image = document.getElementById("insect_enemy");
    }
    updateEnemy(deltaTime){
        super.updateEnemy(deltaTime)
        this.flyAngle += this.velocityAngle;
        this.y += Math.cos(this.flyAngle);
        this.hitbox.y += Math.cos(this.flyAngle);
    }
}

export class SpiderEnemy extends Enemy {
    constructor(game, damage=30, probability=1) {
        super();
        this.game = game;
        this.width = 120;
        this.height = 144;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.image = document.getElementById("spider_enemy");
        this.speedX = 1;
        this.points = 25;
        this.damage = damage;
        this.probability = probability
        this.speedY = Math.random() > 0.5 ? 1 : -1;
        this.maxFrame = 5;
        this.hitbox = new Hitbox(this.x, this.y - 30, this.width, this.height)

    }
    updateEnemy(deltaTime){
        super.updateEnemy(deltaTime);
        if(this.y > this.game.height - this.height - this.game.groundMargin){
            this.speedY *= -1
        }
        //if(this.y > -this.height) this.outScreen = true;
    }
    drawEnemy(context){
        super.drawEnemy(context);
        context.beginPath();
        context.moveTo(this.x,this.y -3500);
        context.lineTo(this.x + this.width/2, this.y + 20);
        context.stroke();
    }
}