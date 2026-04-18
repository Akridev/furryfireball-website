export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';
    }
    draw(context){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.textColour;
        // score
        context.fillText('Score: ' + this.game.score, 20, 40); // draws text on the canvas
        // timer
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);
        
        // energy
        //context.fillText('Energy: ' + Math.ceil(this.game.player.energy), 290, 90);
        let distanceText = 'Distance: ' + Math.floor(this.game.distance) + "m";
        if(this.game.isCampaign) distanceText += '/' + this.game.campaign.props.distance + "m"
        context.fillText(distanceText, 20, 120);
        if(this.game.gamemode == "Time-Rush"){
            context.fillText('Time Left:'+Math.ceil(((this.game.maxTime - this.game.time)*0.001))+"s",20,160)
        }
        //game over messages
        // if(this.game.gameOver){
        //     context.textAlign = 'center';
        //     context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
        //     if(this.game.score > 5){
        //         context.fillText('Boo-yah',
        //         this.game.width * 0.5, this.game.height * 0.5 - 20);
        //         context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
        //         context.fillText('What are the creatures of the night afraid of? YOU!',
        //         this.game.width * 0.5, this.game.height * 0.5 + 20); 
        //     }else{
        //         context.fillText('Love at first bite?',
        //         this.game.width * 0.5, this.game.height * 0.5 - 20);
        //         context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
        //         context.fillText('Nope. better luck next time!',
        //         this.game.width * 0.5, this.game.height * 0.5 + 20); 
        //     }
            
        // }

        if(!this.game.ready) {
            context.textAlign = 'center';
            context.font = this.fontSize  + 'px ' + this.fontFamily;
            
            context.fillText('Press any key to begin',
            this.game.width * 0.5, this.game.height * 0.5 - 20);
        }
        context.restore();
    }
}