export class InputHandler{
    constructor(game){
        this.game = game
        this.keys = [];

        window.addEventListener('keydown', e => {
            // console.log(e.key);
            if((    e.key === 'ArrowDown' ||        
                    e.key ==="ArrowUp"    ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight'||
                    e.key === 'Enter' ||
                    e.key === ' '
                ) && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            } else if (e.key === 'd') this.game.debug = !this.game.debug;
            // console.log(e.key, this.keys);

            if(e.key != 'i' && e.key != 'm' && e.key != "a")
                this.game.ready = true;
        });

        window.addEventListener('keyup', e => {
            if(     e.key === 'ArrowDown' ||    
                    e.key === 'ArrowUp'   ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight'||
                    e.key === 'Enter'     ||
                    e.key === ' '         )
                this.keys.splice(this.keys.indexOf(e.key), 1);
            // console.log(e.key, this.keys);
        })
    }
}