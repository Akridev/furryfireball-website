const isLocalhost =
    location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const STORAGE_API_HOST = isLocalhost
    ? `http://localhost:4000`
    : `https://ades-host-server.herokuapp.com`;



const attempts = [{
    score: 0,
    time: 0,
    gamemode: 'Endless'
}]

// Getting tokens
let accessToken = localStorage.getItem('accessToken');
let refreshToken = localStorage.getItem('refreshToken');
let token;

if (refreshToken != null && refreshToken != "") {
    token = refreshToken
}
else if (accessToken != null && accessToken != "") {
    token = accessToken
}

// if(highestAttempt == null){
//     localStorage.setItem("highestAttempt", JSON.stringify(attempts))
//     highestAttempt = JSON.parse(localStorage.getItem('highestAttempt'));
// }

export class Attempt {
    constructor(game){
        this.game = game;
        this.highScore = 0;
        this.time = 0;
    }

    async addAttempt(){
        let time = (this.game.time*0.001).toFixed(1);
        return fetch(`${STORAGE_API_HOST}/game/attempt`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + accessToken + " " + refreshToken,
            },
            body: JSON.stringify({
                "score": this.game.score,
                "time": time,
                "enemiesKilled": this.game.enemiesKilled,
                "gamemode": this.game.gamemode
            })
        })    
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if(json.error){
                    var attemptCheck = localStorage.getItem('highestAttempt')
                    if(attemptCheck == null) localStorage.setItem('highestAttempt', JSON.stringify(attempts))
                }else{
                    localStorage.removeItem('highestAttempt')
                }
            })
            .catch((error) => {
                alert(error);
            })
    }
    
    getGameData(comparisonData){
        let time = (this.game.time*0.001).toFixed(1);
        let gameData = {
            score: this.game.score,
            time: time
        }
        if(comparisonData){
            if(gameData.score > comparisonData.score){
                return comparisonData;
            }else if (gameData.score == comparisonData.score && gameData.time < comparisonData.time) {
                return
            }
        }
    }

    async updateHighScore(){
        var time = (this.game.time*0.001).toFixed(1);
        var token = localStorage.getItem('accessToken')
        console.log(token)
        console.log("here loggedIn")
        return fetch(`${STORAGE_API_HOST}/game/highScoreByID?gamemode=${this.game.gamemode}`, {
            method: 'GET',
            headers: {
                'Contnt-Type':'application/json',
                Authorization: 'Bearer ' + accessToken + " " + refreshToken,
            }
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if(json.message){
                    if(json.message == "Absent"){
                        fetch(`${STORAGE_API_HOST}/game/highScore?gamemode=${this.game.gamemode}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + accessToken + " " + refreshToken,
                            },
                            body: JSON.stringify({
                                "score": this.game.score,
                                "time": time
                            })
                        })
                        .then((response) => response.json())
                        .then((response) => {
                            console.log(response);
                        })
                        .catch((error) => alert(error.message))
                    }else{
                        console.log(json.message)

                        if(this.game.score > json.message.score){
                            this.highScore = this.game.score
                            fetch(`${STORAGE_API_HOST}/game/highScore?gamemode=${this.game.gamemode}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: 'Bearer ' + accessToken + " " + refreshToken,
                                },
                                body: JSON.stringify({
                                    "score": this.game.score,
                                    "time": time
                                })
                            })
                            .then((response) => response.json())
                            .then((response) => {
                                console.log(response);
                            })
                            .catch((error) => alert(error.message))
                        }
                        
                        else if(this.game.score == json.message.score && time < json.message.time){
                            this.highScore = this.game.score
                            fetch(`${STORAGE_API_HOST}/game/highScore?gamemode=${this.game.gamemode}`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: 'Bearer ' + accessToken + " " + refreshToken,
                                },
                                body: JSON.stringify({
                                    "time": time
                                })
                            })
                            .then((response) => response.json())
                            .then((response) => {
                                console.log(response);
                            })
                            .catch((error) => alert(error.message))
                        }
                        
                        else{
                            this.highScore = json.message.score;
                        }

                    }
                }
                
                else if(json.error){ // Guest User
                    var attempts = JSON.parse(localStorage.getItem('highestAttempt'));
                    let gamemodeAttempt = attempts.find( attempt => attempt['gamemode'] == this.game.gamemode )
                    if(gamemodeAttempt) {
                        console.log(gamemodeAttempt)
                        console.log(time)
                        if(this.game.score > gamemodeAttempt.score){
                            gamemodeAttempt.score = this.game.score;
                            gamemodeAttempt.time = time;
                        }else if (this.game.score == gamemodeAttempt.score && time < gamemodeAttempt.time) {
                            gamemodeAttempt.time = time;
                        }
                        
                        if(isNaN(gamemodeAttempt.score)){
                            gamemodeAttempt.time = this.game.score;
                        }
                        
                        if(isNaN(gamemodeAttempt.time)){
                            gamemodeAttempt.time = time;
                        }

                        this.highScore = gamemodeAttempt.score;
                    }else{
                        attempts.push({
                            score: this.game.score,
                            time: time,
                            gamemode: this.game.gamemode
                        })

                        this.highScore = this.game.score;
                    }
                    
                    localStorage.setItem('highestAttempt', JSON.stringify(attempts));
                }
            })
            .catch((error) => alert(error.message))
    }

    printAttempt(){
        var highestAttempt = JSON.parse(localStorage.getItem('highestAttempt'));
        console.log(highestAttempt)
    }
}