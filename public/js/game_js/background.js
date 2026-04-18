import { bg } from './dynamic.js'

function getBg(value){
    for(var i=0;i<bg.length;i++){
        if(value == bg[i].place){
            return bg[i];
        }
    }
    return bg[0];
}

class Layer {
    constructor(game, width, height, speedModifier, image) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }
    update() {
        if (this.x < -this.width) this.x = 0;
        else this.x -= this.game.speed * this.speedModifier;
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

export class Background {
    constructor(game) {
        this.game = game;
        this.width = 1667;
        this.height = 500;
        this.getBg = getBg(this.game.place);
        this.backgroundLayers=[];
        for(var i=0;i<this.getBg.layers.length;i++){
            this.layer =  this.getBg.layers[i].layer
            this.speedLayer = this.getBg.layers[i].speed
            this.createLayer = new Layer(this.game, this.width, this.height, this.speedLayer, this.layer);
            this.backgroundLayers.push(this.createLayer)
        }
    }
    update() {
        this.backgroundLayers.forEach(layer => {
            layer.update();
        })
    }
    draw(context) {
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        })
    }
}