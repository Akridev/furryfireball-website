const redfire = {
    src: 'images/fireball/redfire.png',
    rows: 8,
    cols: 8,
    frames: 61,
    hitboxOffset: {
        x: 20,
        y: 20,
        width: -40,
        height: -40,
    },
};

const greenfire = {
    src: 'images/fireball/greenfire.png',
    rows: 10,
    cols: 10,
    frames: 91,
    hitboxOffset: {
        x: 20,
        y: 20,
        width: -40,
        height: -40,
    },
};

const crystalsnowflake = {
    src: 'images/fireball/crystalsnowflake.png',
    rows: 8,
    cols: 8,
    frames: 61,
    hitboxOffset: {
        x: 20,
        y: 20,
        width: -40,
        height: -40,
    },
};

const sunburn = {
    src: 'images/fireball/sunburn.png',
    rows: 8,
    cols: 8,
    frames: 61,
    hitboxOffset: {
        x: 40,
        y: 40,
        width: -80,
        height: -80,
    },
};

const freezesnow = {
    src: 'images/fireball/freezesnow.png',
    rows: 10,
    cols: 10,
    frames: 86,
    hitboxOffset: {
        x: 40,
        y: 40,
        width: -80,
        height: -80,
    },
};

const magicflame = {
    src: 'images/fireball/magicflame.png',
    rows: 8,
    cols: 8,
    frames: 61,
    hitboxOffset: {
        x: 40,
        y: 40,
        width: -80,
        height: -80,
    },
};

export default class Fireball {
    constructor(game, playerX, playerY, type = 'sunburn') {
        this.game = game;
        this.image = new Image();
        this.x = playerX + 70;
        this.y = playerY;
        this.outScreen = false;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 3;
        switch (type) {
            case 'Green Fire':
                this.props = greenfire;
                break;
            case 'Red Fire':
                this.props = redfire;
                break;
            case 'Crystal Snowflake':
                this.props = crystalsnowflake;
                break;
            case 'Freeze Snow':
                this.props = freezesnow;
                break;
            case 'Magic Flame':
                this.props = magicflame;
                break;
            case 'sunburn':
            default:
                this.props = sunburn;
        }
        this.image.src = this.props.src;
        this.width = this.image.width / this.props.cols;
        this.height = this.image.height / this.props.rows;
        this.hitbox = {
            x: this.x + this.props.hitboxOffset.x,
            y: this.y + this.props.hitboxOffset.y,
            width: this.width + this.props.hitboxOffset.width,
            height: this.height + this.props.hitboxOffset.height,
        };
        this.currentFrame = 0;
    }

    draw(context) {
        if (this.game.debug)
            context.strokeRect(
                this.hitbox.x,
                this.hitbox.y,
                this.hitbox.width,
                this.hitbox.height
            );
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

    update() {
        // change fireball frame
        if (this.currentFrame >= this.props.frames) this.currentFrame = 0;
        this.frameX = this.currentFrame % this.props.rows;
        this.frameY = (this.currentFrame - this.frameX) / this.props.rows;
        this.currentFrame++;

        // move fireball
        this.x += this.speed;
        this.hitbox.x += this.speed;
        if (this.x > this.game.width) this.outScreen = true;
    }
}
