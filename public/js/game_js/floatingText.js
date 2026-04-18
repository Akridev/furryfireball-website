export class FloatingText {
    constructor(value, x, y, targetX, targetY){
        this.value = value;
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.outScreen = false;
        this.timeBeforeDelete = 0;
        this.fontSize = 20;
        this.fontFamily = 'Helvetica';
    }

    update(){
        this.x += (this.targetX - this.x) * 0.03;
        this.y += (this.targetY - this.y) * 0.03;
        this.timeBeforeDelete++;
        if(this.timeBeforeDelete > 100) this.outScreen = true;
    }

    draw(context){
        context.font = this.fontSize + 'px ' + this.fontFamily
        context.fillStyle = 'black';    
        context.fillText(this.value, this.x, this.y);
    }
}