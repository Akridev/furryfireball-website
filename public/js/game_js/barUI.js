export class HealthBar {
    constructor(game) {
        this.game = game;
        this.x = 290;
        this.y = 15;
        this.width = 200;
        this.height = 25;
        this.maxHealth = this.game.player.health;
        this.maxWidth = this.width;
        this.health = this.maxHealth;
        this.fontSize = 25;
        this.fontFamily = '"Nunito", sans-serif';
        this.livesImage = document.getElementById('lives');
        this.textColor = 'black';
        this.alert = '';
    }

    draw(context) {
        context.lineWidth = 2;
        context.strokeStyle = '#333';
        context.fillStyle = 'darkred';
        context.fillRect(this.x, this.y, this.width, this.height);
        context.strokeRect(this.x, this.y, this.maxWidth, this.height);
        context.drawImage(this.livesImage, this.x, this.y, 25, 25);
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillStyle = this.textColor;
        context.fillText(this.health, this.x + 170, this.y + 21);
        context.fillText(this.alert, this.x - 27, this.y + 21);
    }

    updateHealth(health) {
        if (health < 0) health = 0;
        if (health > this.health) this.health++;
        if (this.health > health) this.health--;

        this.width = (this.health / this.maxHealth) * this.maxWidth;
        if (this.health <= 15) {
            this.textColor = 'red';
            this.alert = '!';
            if (this.health <= 10) this.alert = '! !';
            if (this.health <= 5) this.alert = '! ! !';
        } else {
            this.textColor = 'black';
            this.alert = '';
        }
    }
}

export class EnergyBar {
    constructor(game) {
        this.game = game;
        this.x = 290;
        this.y = 50;
        this.width = 200;
        this.height = 25;
        this.maxEnergy = this.game.player.energy;
        this.maxWidth = this.width;
        this.energy = this.maxEnergy;
        this.fontSize = 25;
        this.fontFamily = '"Nunito", sans-serif';
        this.livesImage = document.getElementById('energy');
        this.boxColor = 'blue';
        this.textColor = 'black';
        this.alert = '';
    }

    draw(context) {
        context.lineWidth = 2;
        context.strokeStyle = '#333';
        context.fillStyle = this.boxColor;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.strokeRect(this.x, this.y, this.maxWidth, this.height);
        context.drawImage(this.livesImage, this.x + 5, this.y + 1, 15, 25);
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillStyle = this.textColor;
        context.fillText(Math.ceil(this.energy), this.x + 170, this.y + 21);
        context.fillText(this.alert, this.x - 27, this.y + 21);
    }

    updateEnergy(energy) {
        this.energy = energy;
        this.width = (this.energy / this.maxEnergy) * this.maxWidth;

        if (this.energy <= 15) {
            this.boxColor = 'red';
            this.textColor = 'red';
            this.alert = '!';
            if (this.energy <= 10) this.alert = '! !';
            if (this.energy <= 5) this.alert = '! ! !';
        } else {
            this.boxColor = 'blue';
            this.textColor = 'black';
            this.alert = '';
        }
    }
}
